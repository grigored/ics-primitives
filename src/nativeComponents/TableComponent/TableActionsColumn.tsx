import { TranslationFunction } from 'i18next';
import * as React from 'react';
import { ACTIONS } from '../../utils/strings';
import { TableRowAction } from './TableComponent.types';
import { Button } from '../../index';
import { View } from '../../primitives/View/View';
import { PopoverComponent } from '../PopoverComponent/PopoverComponent';
import { Row } from './TableComponent.types';
import { createStyles } from "../../index";

const styles = {
    button: {
        boxShadow: '1px 1px 1px lightgrey',
        fontSize: 10
    }
};

interface Props {
    actions: Array<TableRowAction>;
    t: TranslationFunction;
    row: Row;
    classes: any | undefined;
}

const CTableActionsColumn = (props: Props): any => {
   let { actions, t, row } = props;

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
                       styles={{root: styles.button}}
                   />
               </PopoverComponent> 
           }
       </View>
    );     
};

export const TableActionsColumn = createStyles(styles, 'CTableActionsColumn')(CTableActionsColumn);
