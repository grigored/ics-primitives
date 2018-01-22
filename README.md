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


Alternatives:
react xp
react native web
react primitives

BuilderX -> no typescript, absolute positioning, can not do responsive designs
https://reactstudio.com/