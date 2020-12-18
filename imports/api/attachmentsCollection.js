import { FilesCollection } from 'meteor/ostrio:files';
import { Meteor } from 'meteor/meteor';

let uploadPaths = null;
if (Meteor.isServer) {

  const fs = require('fs');

  uploadPaths = `${Meteor.absolutePath.split('/').slice(0, -1).join('/')}/meteorUploads`;

  console.log('UPLOAD PATH:', uploadPaths);

  if (!fs.existsSync(uploadPaths)) {
    fs.mkdirSync(uploadPaths);
  }
}

class AttachmentsCollection {
  constructor() {
    /**
     * Don't forget to change the path to the server path
     */
    // const storagePath = path: '/home/servicedesk/DEPLOY/LINIO_SERVICEDESK_PRODUCAO/bundle/uploads'
    this.attachments = new FilesCollection({
      collectionName: 'Attachments',
      allowClientCode: false, // actions from client
      // Mudar a cada versão
      // ToDo Colocar em uma variável de ambiente
      storagePath: uploadPaths,
      onBeforeUpload(file) {
        // Allow upload files under 10MB, and only in png/jpg/jpeg formats
        if (
          file.size <= 1048576 * (500) // (500MB)
          && /png|jpg|jpeg|gif|pdf|doc|ppt|pptx|docx|csv|xlsx|xls|txt|sql|zip|rar|gz|mp4/i.test(
          file.extension)
        ) {
          return true;
        }
        return 'Please upload image, with size equal or less than 10MB';
      },
    });
    if (Meteor.isServer) {
      /* Allow all
       * @see http://docs.meteor.com/#/full/allow
       */
      this.attachments.allowClient();
    }
    this.applyPublication();
  }

  applyPublication = () => {
    const self = this;
    if (Meteor.isServer) {
      Meteor.methods({
        RemoveFile: (id) => {
          check(id, String);
          try {
            const file = self.attachments.findOne({ _id: id });
            if (file) {
              file.remove();
            }
          } catch (e) {
            //console.log('Error on Remove File',e);
            return true;
          }

        },
      });

      Meteor.publish('files-attachments', (filter) => {
        check(filter, Object);
        return self.attachments.collection.find({ ...filter });
      });
    }
  };

  find = (filter) => {
    return this.attachments.collection.find(filter);
  };

  findOne = (filter) => {
    return this.attachments.findOne(filter);
  };

  getCollection = () => {
    return this.attachments;
  };
}

export const attachmentsCollection = new AttachmentsCollection();
