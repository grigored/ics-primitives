import Popover from 'material-ui/Popover';
import * as React from 'react';
import { Button, createStyles, View, WithStyles } from '../../';
import { StyleRules } from '../../utils/theme.types';
import { OwnProps } from '../PopoverComponent/PopoverComponent.types';
import { TableRowAction } from '../TableComponent/TableComponent.types';

const styles: StyleRules = {
    container: {},
    popover: {
        width: 150,
    },
};


class CPopoverComponent extends React.PureComponent<OwnProps & WithStyles, { popOverVisible: boolean }> {
    handleClick = ( event: React.MouseEvent<HTMLElement> ) => {
        event.preventDefault();
        this.anchorEl = event.currentTarget;
    };
    handleRequestClose = () => {
        this.setState({popOverVisible: false})
    };
    private anchorEl: any;

    constructor( props: OwnProps & WithStyles ) {
        super(props);
        this.anchorEl = null;
        this.state = {
            popOverVisible: false,
        };
    }

    render() {
        const {classes, children, actions, containerStyle} = this.props,
            {popOverVisible} = this.state,
            enhancedChild = React.cloneElement(
                children as any,
                {
                    onPress: ( event: React.MouseEvent<HTMLElement> ) => {
                        this.handleClick(event);
                        this.setState({popOverVisible: !popOverVisible});
                    }
                }
            );

        return (
            <View style={[classes.container, containerStyle]}>
                {enhancedChild}
                <Popover
                    open={popOverVisible}
                    anchorEl={this.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    onClose={this.handleRequestClose}
                >
                    {
                        actions.map(( action: TableRowAction ) =>
                            <Button
                                key={`action_${action.title}`}
                                // icon={action.icon}
                                // iconStyle={{ position: 'absolute', left: 0, tintColor: null, alignSelf: 'center', }}
                                title={action.title}
                                onPress={() => {
                                    action.onPress();
                                    this.setState({popOverVisible: false});
                                }}
                                // touchableStyle={{ minWidth: 300 }}
                            />
                        )
                    }
                </Popover>
            </View>
        )
    }
}

const componentName = 'PopoverComponent';
export const PopoverComponent: React.ComponentType<OwnProps> = createStyles(styles, componentName)(CPopoverComponent);
