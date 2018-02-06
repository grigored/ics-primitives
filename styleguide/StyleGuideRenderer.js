import React from 'react';
import PropTypes from 'prop-types';
import Logo from 'rsg-components/Logo';
import Markdown from 'rsg-components/Markdown';
import Styled from 'rsg-components/Styled';
import {Button} from '../src/nativeComponents/Button/Button';
import {View} from '../src/primitives/View/View';
import {Image} from '../src/primitives/Image/Image';
import cx from 'classnames';

const xsmall = '@media (max-width: 600px)';

const styles = ({font, base, light, link, baseBackground, sidebarWidth, space, color, mq}) => ({
    root: {
        color: base,
        backgroundColor: baseBackground,
    },

    hasSidebar: {
        paddingLeft: sidebarWidth,
        [mq.small]: {
            paddingLeft: 0,
        },
    },
    header: {
        color: '#fff',
        backgroundColor: link,
    },
    bar: {
        display: 'flex',
        alignItems: 'center',
        [xsmall]: {
            flexDirection: 'column',
            alignItems: 'center',
        },
    },
    nav: {
        marginLeft: 'auto',
        marginRight: '-0.5em',
        [xsmall]: {
            margin: [[10, 0, 0]],
        },
    },
    headerLink: {
        '&, &:link, &:visited': {
            marginLeft: '0.5em',
            marginRight: '0.5em',
            fontFamily: font,
            color: '#efefef',
        },
        '&:hover, &:active': {
            color: '#fff',
            cursor: 'pointer',
        },
    },
    content: {
        maxWidth: 1000,
        padding: [[15, 30]],
        margin: [[0, 'auto']],
        [mq.small]: {
            padding: 15,
        },
        display: 'block',
    },
    components: {
        overflow: 'auto',  // To prevent the pane from growing out of the screen
    },
    footer: {
        display: 'block',
        color: light,
        fontFamily: font,
        fontSize: 12,
    },
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

    sidebar: {
        backgroundColor: color.sidebarBackground,
        border: [[color.border, 'solid']],
        borderWidth: [[0, 1, 0, 0]],
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: sidebarWidth,
        overflow: 'auto',
        [mq.small]: {
            position: 'static',
            width: 'auto',
            borderWidth: [[1, 0, 0, 0]],
            paddingBottom: space[0],
        },
    },
    logo: {
        padding: space[2],
        borderBottom: [[1, color.border, 'solid']],
    },
});

class StyleGuideRenderer extends React.PureComponent {
    ios = 'ios';
    android = 'android';
    web = 'web';

    constructor(props) {
        super(props);
        this.state = {
            selectedFrame: this.ios,
            selectedComponent: 'Link',
        };

        window.onhashchange = () => {
            const url = document.URL;
            this.setState({selectedComponent: url.substring(url.indexOf('#') + 1)});
        };
    }

    render() {
        const {classes, title, hasSidebar, toc, homepageUrl, children,} = this.props,
            {selectedFrame, selectedComponent} = this.state,
            unselectedColor = '#777',
            selectedColor = '#4CAF50',
            icsClasses = styles({mq: {},space: {}, color: {}});
        return (
            <div className={cx(classes.root, hasSidebar && classes.hasSidebar)}>
                <header className={classes.header}>
                    <div className={classes.content}>
                        <div className={classes.bar}>
                            <Logo>{title}</Logo>
                            <nav className={classes.nav}>
                                <a className={classes.headerLink}
                                   href="https://github.com/styleguidist/react-styleguidist/tree/master/docs">Docs</a>
                                <a className={classes.headerLink}
                                   href="https://github.com/styleguidist/react-styleguidist">GitHub</a>
                                <a className={classes.headerLink}
                                   href="https://gitter.im/styleguidist/styleguidist">Gitter</a>
                            </nav>
                        </div>
                    </div>
                </header>
                <main className={classes.content}>
                    <View style={icsClasses.screenShots}>
                        <View style={icsClasses.buttonContainer}>
                            <Button
                                styles={[icsClasses.button, selectedFrame === this.ios && icsClasses.selectedButton]}
                                backgroundColor={selectedFrame === this.ios ? selectedColor : unselectedColor}
                                labelColor={'#fff'}
                                onPress={() => {
                                    this.setState({selectedFrame: this.ios});
                                }}
                            >
                                iOS
                            </Button>
                            <Button
                                styles={[icsClasses.button, selectedFrame === this.android && icsClasses.selectedButton]}
                                backgroundColor={selectedFrame === this.android ? selectedColor : unselectedColor}
                                labelColor={'#fff'}
                                onPress={() => {
                                    this.setState({selectedFrame: this.android});
                                }}
                            >
                                Android
                            </Button>
                            <Button
                                styles={[icsClasses.button, selectedFrame === this.web && icsClasses.selectedButton]}
                                backgroundColor={selectedFrame === this.web ? selectedColor : unselectedColor}
                                labelColor={'#fff'}
                                onPress={() => {
                                    this.setState({selectedFrame: this.web});
                                }}
                            >
                                Web
                            </Button>
                        </View>

                        <View style={icsClasses.phone}>
                            <Image
                                style={[
                                    icsClasses.phoneFrame,
                                    selectedFrame === this.ios && icsClasses.phoneFrameIOS,
                                    selectedFrame === this.android && icsClasses.phoneFrameAndroid,
                                    selectedFrame === this.web && icsClasses.phoneFrameWeb,
                                ]}
                                source={{uri: `../styleguide/${selectedFrame}.png`}}
                            />
                            <Image
                                style={[
                                    icsClasses.gif,
                                    selectedFrame === this.ios && icsClasses.gifIOS,
                                    selectedFrame === this.android && icsClasses.gifAndroid,
                                    selectedFrame === this.web && icsClasses.gifWeb,
                                ]}
                                source={{uri: `../pngToGif/${selectedComponent.toLowerCase()}.${selectedFrame}.gif`}}
                            />
                        </View>
                    </View>
                    {children}


                    <footer className={classes.footer}>
                        <Markdown text={`Generated with [React Styleguidist](${homepageUrl}) ❤️`}/>
                    </footer>
                </main>
                {hasSidebar && (
                    <div className={classes.sidebar}>
                        <div className={classes.logo}>
                            <Logo>{title}</Logo>
                        </div>
                        {toc}
                    </div>
                )}
            </div>
        );
    }
}

StyleGuideRenderer.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    homepageUrl: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    toc: PropTypes.node.isRequired,
    hasSidebar: PropTypes.bool,
};

export default Styled(styles)(StyleGuideRenderer);