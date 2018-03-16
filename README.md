* Styles can be specified like this: 
```
// platform before class name
import {web, ios, android} from 'src/utils/theme';

const styles = {
    container: {
        [web]: {
            padding: 1,
        },
        [ios]: {
            padding: 2,
        },
        [android]: {
            padding: 3,
        },
        [all]: {
            padding: 4,
        },
    }
}
```
or 
```
// platform inside class styles
import {web, native, all} from 'src/utils/theme';

const styles = {
    container: {
        padding: {
            [web]: 1,
            [native]: 2,
            [all]: 3
        },
    }
}
```

* Things to pay attention:
1. on web, styles cascade to children, this does not happen in sketch (and native?)


# How to use the lib locally
1. Install yacc:
    ```bash
    yarn global add yalc
    ```
1. Run this from ```ics-primitives``` root:
    ```bash
    yarn
    yarn build
    yalc publish  # this publishes code to local yalc repo
    ```
1. Go to your development project (eg: ```instacar-front```) and run (remember to run this after every ```yarn``` or ```npm install```):
    ```bash
    yalc link react-web-native-sketch
    ```
1. When making code changes to ```ics-primitives``` run (from ```ics-primitives``` root):
    1. Run:
        ```bash
        yarn build  # run this if necessary
        yalc push
        ```
    1. Refresh web page


# TODO
1. Add internationalization (using context maybe?)
1. Add the rest of form components
    1. select
    1. checkbox
    1. radio group
    1. photo upload
    1. array of photos
    1. array of objects
    1. date/time picker
1. Document components
1. Navigation (native and web)
1. Dialogs
1. Alerts