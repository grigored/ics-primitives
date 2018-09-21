import { TranslationFunction } from 'i18next';
import * as React from 'react';
import { ACTIONS } from '../../utils/strings';
import { TableRowAction } from './TableComponent.types';
import { Button } from '../../index';
import { View } from '../../primitives/View/View';
import { PopoverComponent } from '../PopoverComponent/PopoverComponent';
import { Row } from './TableComponent.types';
import { WithStyles } from '../../utils/theme.types';
import { createStyles, web } from '../../index';

const styles = {
    button: {       
        [web]: {
            boxShadow: '1px 1px 1px lightgrey',
        },
        fontSize: 10
    }
};

interface TableActionProps {
    actions: Array<TableRowAction>;
    t: TranslationFunction;
    row: Row;    
}

type Props = TableActionProps & WithStyles;

const CTableActionsColumn = (props: Props): any => {
   let { actions, t, row, classes } = props;

   return (       
       <View style={{ flexDirection: 'row' }}>
           {
               actions.length > 0 && 
               <PopoverComponent
                   actions={actions.map(action => ({
                       ...action,
                       title: action.title && t(action.title),
                       titleXs: action.titleXs && t(action.titleXs),
                       onPress: () => action.onPress(row)
                   }))}
               >
                   <Button
                       title={t(ACTIONS)}
                       backgroundColor={'lightblue'}                       
                       styles={{root: classes.button}}
                   />
               </PopoverComponent> 
           }
       </View>
    );     
};

export const TableActionsColumn = 
    createStyles(styles, 'CTableActionsColumn')(CTableActionsColumn) as React.ComponentType<TableActionProps>;
