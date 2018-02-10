import React from "react";
import {Button} from '../src/nativeComponents/Button/Button';
import {View} from '../src/primitives/View/View';
import {Image} from '../src/primitives/Image/Image';


const styles = {
    screenShots: {
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        width: 258,
        height: 520,
        top: '50%',
        marginTop: -260, /* negative half of height (needed for centering) */
        right: 32,
        flexShrink: 0,
    },
    button: {
        backgroundColor: '#777',
    },
    selectedButton: {
        color: '#f00',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 16,
    },
    phone: {
        position: 'relative',
    },

    phoneFrame: {
        position: 'absolute',
        objectFit: 'contain',
    },
    phoneFrameIOS: {
        width: 258,
        height: 520,
    },
    phoneFrameAndroid: {
        width: 250,
        height: 520,
    },
    phoneFrameWeb: {
        width: 258,
        height: 520,
    },
    gif: {
        position: 'absolute',
        objectFit: 'contain',
    },
    gifIOS: {
        top: 63,
        left: 17,
        width: 224,
        height: 400,
    },
    gifAndroid: {
        top: 61,
        left: 10,
        width: 227,
        height: 404,
    },
    gifWeb: {
        top: 62,
        left: 17,
        width: 224,
        height: 400,
    },
};

export class PhoneFrameGifPlayer extends React.PureComponent {
    ios = 'ios';
    android = 'android';
    web = 'web';
    pathMap = {};

    constructor(props) {
        super(props);
        this.state = {
            selectedFrame: this.ios,
            selectedComponent: (props.sectionComponents && props.sectionComponents[0].name && props.sectionComponents[0].name.toLowerCase()) || '',
        };
        for (let section of props.sectionComponents) {
            if(section.name) {
                this.pathMap[section.name.toLowerCase()] = section.filepath;
            }
        }
        window.onhashchange = () => {
            const url = document.URL;
            this.setState({selectedComponent: url.substring(url.indexOf('#') + 1).toLowerCase()});
        };
    }

    render() {
        const {selectedFrame, selectedComponent} = this.state,
            unselectedColor = '#777',
            selectedColor = '#4CAF50';
        console.log(this.pathMap[selectedComponent]);
        return (
            <View style={styles.screenShots}>
                <View style={styles.buttonContainer}>
                    <Button
                        styles={[styles.button, selectedFrame === this.ios && styles.selectedButton]}
                        backgroundColor={selectedFrame === this.ios ? selectedColor : unselectedColor}
                        labelColor={'#fff'}
                        onPress={() => {
                            this.setState({selectedFrame: this.ios});
                        }}
                    >
                        iOS
                    </Button>
                    <Button
                        styles={[styles.button, selectedFrame === this.android && styles.selectedButton]}
                        backgroundColor={selectedFrame === this.android ? selectedColor : unselectedColor}
                        labelColor={'#fff'}
                        onPress={() => {
                            this.setState({selectedFrame: this.android});
                        }}
                    >
                        Android
                    </Button>
                    <Button
                        styles={[styles.button, selectedFrame === this.web && styles.selectedButton]}
                        backgroundColor={selectedFrame === this.web ? selectedColor : unselectedColor}
                        labelColor={'#fff'}
                        onPress={() => {
                            this.setState({selectedFrame: this.web});
                        }}
                    >
                        Web
                    </Button>
                </View>

                <View style={styles.phone}>
                    <Image
                        style={[
                            styles.phoneFrame,
                            selectedFrame === this.ios && styles.phoneFrameIOS,
                            selectedFrame === this.android && styles.phoneFrameAndroid,
                            selectedFrame === this.web && styles.phoneFrameWeb,
                        ]}
                        source={{uri: `../styleguide/${selectedFrame}.png`}}
                    />
                    <Image
                        style={[
                            styles.gif,
                            selectedFrame === this.ios && styles.gifIOS,
                            selectedFrame === this.android && styles.gifAndroid,
                            selectedFrame === this.web && styles.gifWeb,
                        ]}
                        source={{uri: `../pngToGif/${selectedComponent.toLowerCase()}.${selectedFrame}.gif`}}
                    />
                </View>
            </View>
        );
    }
}
