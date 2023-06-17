import * as React from 'react';
import { View, Text,Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TextInputDestination from './Text_Input.js';



// const Notifiacation = (props:NotificationProps) => {

// }







export default class Notification extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        destination: PropTypes.string,
        bus_name: PropTypes.string,
        remain_time: PropTypes.string, // format: "xx:yymm" xx: hours, yy:minutes mm: am/pm
        repeat_notify: PropTypes.bool, // if == 1, it won't disappear after closing the notify
        time_to_notufy: PropTypes.string, // timepint to notify before the bus come 
        remind_day: PropTypes.string, // seven chars string, start from Monday, e.g. "TTTFFFF" means to notify on Mon. to Wed.

    };

    constructor(props) {
        super(props);
        // this.handleClick = this.handleClick.bind(this);
        // this.handleTooltipToggle = this.handleTooltipToggle.bind(this);
        // this.handleVote = this.handleVote.bind(this);
    }

    // render() {
    //     const {id, mood, text, ts,} = this.props;
    //     return (
    //         <div className='post-item d-flex flex-column'>
    //             <div className='post d-flex'>
    //                 <div className='wrap'>
    //                     <div className='ts'>{moment(ts * 1000).calendar()}</div>
    //                     <div className='text'>{text}</div>
    //                 </div>
    //                 <div className='mood'><i className={getMoodIcon(mood)}></i></div>
    //             </div>
    //         </div>
    //     );
    // }
}


