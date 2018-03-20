import * as React from "react";
import { connect } from "react-redux";
import { View } from "../../primitives/View/View";
import { Touchable } from "../../primitives/Touchable/Touchable";
import { appTheme } from "../../utils/theme";
import { TopBarButtonProps } from "./TopBarButton.types";
import { isIOS } from "../../primitives/platform/platform";
import { WithStyles } from "../../utils/theme.types";
import { Image } from "../../primitives/Image/Image";
import { Button } from "../Button/Button";
import { createStyles } from "../../primitives/createStyles/createStyles";

const styles = () => ({
    containerImg: {
        height: '100%',
        paddingLeft: 16,
        paddingRight: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        paddingLeft: 16,
        paddingRight: 16,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 0,
        borderRadius: 0,
    },
    buttonText: {
        color: isIOS ? appTheme.primaryColor : '#000',
        fontSize: 17,
        fontWeight: '400',
    },
    imgSrc: {
        width: 24,
        height: 24,
        tintColor: isIOS ? appTheme.primaryColor : '#000',
    }
});

class CTopBarButton extends React.PureComponent<TopBarButtonProps & WithStyles, {}> {
    render() {
        const {onPress, imgSrc, text, goBack, navigation, classes} = this.props;
        if (imgSrc) {
            return (
                <Touchable
                    onPress={() => {
                        goBack && navigation.goBack();
                        onPress && onPress();
                    }}
                    useForeground={true}
                >
                    <View style={classes.containerImg}>
                        <Image
                            source={imgSrc}
                            style={classes.imgSrc}
                        />
                    </View>

                </Touchable>
            )
        }
        return (
            <Button
                title={text}
                onPress={() => {
                    goBack && navigation.goBack();
                    onPress && onPress();
                }}
            />
        );
    }
}

const componentName = 'TopBarButton';
export const TopBarButton: React.ComponentType<TopBarButtonProps> = connect(
    null,
    (dispatch, ownProps: TopBarButtonProps) => ({
        ...ownProps,
        onPress: (args: any) => {
            let returnValue = ownProps.onPress && ownProps.onPress(...(args || {}));
            if (!returnValue) {
                return;
            }
            dispatch(returnValue);
        }
    })
)(createStyles(styles, componentName)(CTopBarButton));
