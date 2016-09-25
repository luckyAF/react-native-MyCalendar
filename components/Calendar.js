'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ViewPagerAndroid,
    TouchableOpacity,
    PixelRatio
} from 'react-native';
let {height, width} = Dimensions.get('window');

export default class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: this.props.date.getFullYear(),
            month: this.props.date.getMonth(),
            day: this.props.date.getDate(),
            busyDay: this.props.busyDay,
            onDateChange: this.props.func,
        }
    };

    nextMonth() {
        let newYear = this.state.year
        let newMonth = this.state.month;
        let newDate = this.state.day;
        if (this.state.month == 11) {
            newYear = this.state.year + 1;
            newMonth = 0;
        } else {
            newMonth = this.state.month + 1;
        }
        this.setState({
            day: newDate,
            month: newMonth,
            year: newYear,
        });
        if (this.props.onDateChange) {
            this.props.onDateChange(new Date(newYear, newMonth, newDate));
        }

    }

    prevMonth() {
        let newYear = this.state.year;
        let newMonth = this.state.month;
        let newDate = this.state.day;
        if (this.state.month == 0) {
            newYear = this.state.year - 1;
            newMonth = 11;
        } else {
            newMonth = this.state.month - 1;
        }
        this.setState({
            day: newDate,
            month: newMonth,
            year: newYear,
        });
        if (this.props.onDateChange) {
            this.props.onDateChange(new Date(newYear, newMonth, newDate));
        }
    }

    myScroll(event) {
        var that = this;
        if (event.nativeEvent.position == 2) {
            that.nextMonth()
            that.refs.trueViewPager.setPageWithoutAnimation(1);
        }
        if (event.nativeEvent.position == 0) {
            that.prevMonth();
            that.refs.trueViewPager.setPageWithoutAnimation(1);
        }
    };

    selectDay(d) {
        this.setState({
            day: d,
        })
        if (this.props.onDateChange) {
            this.props.onDateChange(new Date(this.state.year, this.state.month, d));
        }

    };

    backToday() {
        var today = new Date();
        this.setState({
            year: today.getFullYear(),
            month: today.getMonth(),
            day: today.getDate(),
        })
        this.props.onDateChange(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.head}>
                    <TouchableOpacity onPress={() => this.prevMonth() } style={styles.prevNextTouch}>
                        <Text style={styles.prevNext}>{this.props.prevTitle?this.props.prevTitle : 'Prev'}</Text>
                    </TouchableOpacity>
                    <View style={styles.dayTitle}>
                        <Text style={styles.t1}>
                            {this.state.year + '年' + (this.state.month + 1) + '月' + (this.state.day) + '日'}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => this.nextMonth() } style={styles.prevNextTouch}>
                        <Text style={styles.prevNext}>{this.props.nextTitle?this.props.nextTitle : 'Next'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 0.5, backgroundColor: '#51c6d0', }}/>
                <View style={styles.dateTitle}>
                    <Text style={styles.dateTitleText}>日</Text>
                    <Text style={styles.dateTitleText}>一</Text>
                    <Text style={styles.dateTitleText}>二</Text>
                    <Text style={styles.dateTitleText}>三</Text>
                    <Text style={styles.dateTitleText}>四</Text>
                    <Text style={styles.dateTitleText}>五</Text>
                    <Text style={styles.dateTitleText}>六</Text>
                </View>
                <ViewPagerAndroid
                    style={styles.list}  
                    initialPage={1}
                    onPageSelected={event => this.myScroll(event) } ref="trueViewPager">
                    <View>
                        <DateBoard
                            year={this.state.year}
                            month={this.state.month - 1}
                            day={this.state.day}
                            selectDay={this.selectDay.bind(this) }
                            busyDay={this.props.busyDay}/>

                    </View>
                    <View>
                        <DateBoard
                            year={this.state.year}
                            month={this.state.month}
                            day={this.state.day}
                            selectDay={this.selectDay.bind(this) }
                            busyDay={this.props.busyDay}/>

                    </View>
                    <View>
                        <DateBoard
                            year={this.state.year}
                            month={this.state.month + 1}
                            day={this.state.day}
                            selectDay={this.selectDay.bind(this) }
                            busyDay={this.props.busyDay}/>

                    </View>
                </ViewPagerAndroid>
            </View>

        )
    }
}

class DateBoard extends React.Component {
    static defaultProps = {
        year: 2016,
        month: 0,
        busyDay: [],
    };
    static propTypes = {
        year: React.PropTypes.number,
        month: React.PropTypes.number,
        selectDay: React.PropTypes.func,
        day: React.PropTypes.number,
        busyDay: React.PropTypes.array
    };

    constructor(props) {
        super(props);
        this.isBusy = false;
    };
    componentDidMount() {

    }

    getFebDays() {
        var lastDayOfMonth = new Date(this.props.year, 2, 0);
        return lastDayOfMonth.getDate();
    };

    renderDate() {
        let myMonth, myYear = 0;
        if (this.props.month == 12) {
            myMonth = 0;
            myYear = this.props.year + 1;
        } else if (this.props.month == -1) {
            myMonth = 11;
            myYear = this.props.year - 1;
        } else {
            myMonth = this.props.month;
            myYear = this.props.year
        }
        let fd = new Date(myYear, myMonth, 1);//该月第一天
        let firstDay = fd.getDay();//该月第一天星期几
        let monthDay = [31, this.getFebDays(), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let arr = [];
        for (let i = 0; i < firstDay; i++) {
            arr.push(<View key={-i} style={styles.dateBox}></View>)
        }
      
        
        for (var i = 1; i < monthDay[myMonth] + 1; i++) {
            if (this.props.day == i) {
                arr.push(
                    <TouchableOpacity onPress={this.props.selectDay.bind(this, i) } key={i} style={styles.dateBox}>
                        <View style={[styles.selected, { backgroundColor: '#35c0c5' }]}>
                            <Text style={[styles.dateText, { color: '#fff', fontWeight: 'bold' }]}>{i}</Text>
                            {this._ifBusy(myYear,myMonth,i)? <View style={styles.point}></View> : null}
                        </View>
                    </TouchableOpacity>
                )
            } else {
                arr.push(
                    <TouchableOpacity onPress={this.props.selectDay.bind(this, i) } key={i} style={styles.dateBox}>
                        <View style={styles.selected}>
                            <Text style={styles.dateText}>{i}</Text>
                            {this._ifBusy(myYear,myMonth,i)? <View style={styles.point}></View> : null}
                        </View>
                    </TouchableOpacity>
                )

            }
        }
        return arr;
    };
    _ifBusy(year,month,day) { 
        for (var i = 0; i < this.props.busyDay.length; i++) { 
            if (this.props.busyDay[i].getFullYear() == year
                && this.props.busyDay[i].getMonth() == month
                && this.props.busyDay[i].getDate() == day) { 
                return true;
                }
        }
        return false;
    }

    render() {
        return (
            <View style={styles.dateBoard}>
                {this.renderDate() }
            </View>
        )
    }
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    head: {
        height: 50,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
    },
    dayTitle: {
        flex: 1,
    },
    dayTimeTouch: {
        height: 50,
        justifyContent: 'center'
    },
    t1: {
        fontSize: 15,
        textAlign: 'center',
        color: '#000',
    },
    prevNextTouch: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    prevNext: {
        fontSize: 14,
        color: '#000',
        paddingLeft: 10,
    },
    dateTitle: {
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5,
        borderBottomWidth: .5,
        borderColor: '#ddd'
    },
    dateTitleText: {
        width: width / 7 - 1,
        textAlign: 'center',
        fontSize: 12,
    },

    dateBoard: {
        width: width,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'rgb(250, 250, 250)',
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#ccc'
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1
    },
    dateBox: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width / 7,
        height: width / 9,
    },
    dateText: {
        fontSize: 14,
    },
    lunarFont: {
        fontSize: 9,
    },
    selected: {
        alignItems: 'center',
        justifyContent: 'center',
        width: width / 10,
        height: width / 10,
        borderRadius: width / 20,
    },

    point: {
        position: 'absolute',
        left: width / 20 -3,
        bottom: 3,
        width: 5,
        height: 5,
        borderRadius: 3,
        backgroundColor: '#f00'
    }
});