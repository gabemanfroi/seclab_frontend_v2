import styled from 'styled-components';
import { dark200 } from 'modules/Shared/stylesHelpers/colorVariables';
import { ColumnContainer } from 'modules/Shared/stylesHelpers/components/Containers';

export const Container = styled(ColumnContainer)`
  flex: 0 0 15%;
  padding: 32px 16px;
  background: ${dark200};

  > * {
    flex: 1;
  }
`;
