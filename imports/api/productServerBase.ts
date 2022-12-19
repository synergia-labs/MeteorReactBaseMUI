import { Meteor } from 'meteor/meteor';
import { ServerApiBase } from '/imports/api/serverBase';
import { IBaseOptions } from '/imports/typings/IBaseOptions';
import { IDoc } from '/imports/typings/IDoc';
import { ISchema } from '/imports/typings/ISchema';
import { hasValue } from '/imports/libs/hasValue';
import sharp from 'sharp';
import { IContext } from '/imports/typings/IContext';

export class ProductServerBase<Doc extends IDoc> extends ServerApiBase<any> {
    constructor(apiName: string, apiSch: ISchema<Doc>, options?: IBaseOptions) {
        super(apiName, apiSch, options);

        this.serverGetImageThumbnail = this.serverGetImageThumbnail.bind(this);
        this.afterUpdate = this.afterUpdate.bind(this);
        this.afterInsert = this.afterInsert.bind(this);
        this.resizeImage = this.resizeImage.bind(this);
    }

    resizeImage(_docObj: any) {
        Object.keys(_docObj).forEach(async (field, index) => {
            if (this.schema[field] && this.schema[field].isImage && hasValue(_docObj[field])) {
                try {
                    const matches = _docObj[field].match(/^data:([A-Za-z-+\/]+);base64,([\s\S]+)$/);
                    let resizedImage = Buffer.from(matches[2], 'base64');

                    if ((matches[1] + '').toLowerCase() === 'webp') return;

                    if (this.schema[field].isAvatar) {
                        resizedImage = await sharp(resizedImage)
                            .resize({
                                fit: 'contain',
                                background: {
                                    r: 255,
                                    g: 255,
                                    b: 255,
                                    alpha: 0.01,
                                },
                                width: 120,
                                height: 120,
                            })
                            .toFormat('webp')
                            .toBuffer();
                    } else {
                        if (this.schema[field].defaultSize) {
                            resizedImage = await sharp(resizedImage)
                                .resize({
                                    fit: 'contain',
                                    background: {
                                        r: 255,
                                        g: 255,
                                        b: 255,
                                        alpha: 0.01,
                                    },
                                    width: parseInt(this.schema[field].defaultSize.width),
                                    height: parseInt(this.schema[field].defaultSize.height),
                                })
                                .toFormat('webp')
                                .toBuffer();
                        } else {
                            resizedImage = await sharp(resizedImage).toFormat('webp').toBuffer();
                        }
                    }

                    const newImg = resizedImage.toString('base64');
                    _docObj[field] = `data:image/webp;base64,${newImg}`;

                    this.getCollectionInstance().update(
                        { _id: _docObj._id },
                        {
                            $set: _docObj,
                        }
                    );
                } catch (e) {
                    console.log('img convert error', e);
                }
            }
        });
    }

    serverGetImageThumbnail(field: string, _id: string, date: Date = new Date()) {
        const path = `${Meteor.absoluteUrl()}thumbnail/${
            this.collectionName
        }/${field}/${_id}?date=${date.toISOString()}`;
        return path;
    }

    afterUpdate(_docObj: any, _context: IContext): Doc & { collection: string | null } {
        this.resizeImage(_docObj);
        return super.afterUpdate(_docObj, _context);
    }
    afterInsert(_docObj: any, _context: IContext): Doc & { collection: string | null } {
        this.resizeImage(_docObj);
        return super.afterInsert(_docObj, _context);
    }
}
