import React, {
    Component,
} from 'react';
import RootSiblings from 'react-native-root-siblings';
import ToastContainer, {positions, durations} from './ToastContainer';

class Toast extends Component {
    static displayName = 'Toast';
    static propTypes = ToastContainer.propTypes;
    static positions = positions;
    static durations = durations;
    static config = null;

    static show = (message, options = {position: positions.BOTTOM, duration: durations.SHORT}) => {
        return new RootSiblings(<ToastContainer
            {...options}
            visible={true}
        >
            {options?.type ? this.config[options.type](message) : null}
        </ToastContainer>);
    };

    static hide = toast => {
        if (toast instanceof RootSiblings) {
            toast.destroy();
        } else {
            console.warn(`Toast.hide expected a \`RootSiblings\` instance as argument.\nBut got \`${typeof toast}\` instead.`);
        }
    };

    static setConfig = toastConfig => {
        this.config = toastConfig;
    }

    _toast = null;

    componentWillMount = () => {
        this._toast = new RootSiblings(<ToastContainer
            {...this.props}
            duration={0}
        />);
    };

    componentWillReceiveProps = nextProps => {
        this._toast.update(<ToastContainer
            {...nextProps}
            duration={0}
        />);
    };

    componentWillUnmount = () => {
        this._toast.destroy();
    };

    render() {
        return null;
    }
}

export {
    RootSiblings as Manager
};
export default Toast;
