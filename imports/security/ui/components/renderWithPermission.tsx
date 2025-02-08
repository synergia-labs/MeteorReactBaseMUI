import { ReactNode } from 'react';
import { getUser } from '/imports/libs/getUser';
import { segurancaApi } from '../../api/segurancaApi';
import { hasValue } from '/imports/libs/hasValue';

type RenderComPermissaoProps = {
  resources?: Array<string>;
  /**Ignora validação de recurso e renderiza se true*/
  ignore?: boolean;
  //condição extra opcional se possuir recurso.
  showCondition?: () => boolean;
  children: ReactNode;
};

/**
 * @param recursos nomes do recursos
 * @param permissionFunc opcional. condicao extra testada para a exibição
 * @param children
 * @constructor
 */
const RenderWithPermission = ({
  resources: recursos,
  showCondition,
  children,
  ignore = false
}: RenderComPermissaoProps): ReactNode | null => {
  if(!recursos) return children;
  const user = getUser();
  if (ignore || segurancaApi.podeAcessarRecurso(user, ...recursos)) {
    if (hasValue(showCondition)) {
      if (showCondition!()) return children;
      return null;
    }
    return children;
  }

  return null;
};


export default RenderWithPermission;