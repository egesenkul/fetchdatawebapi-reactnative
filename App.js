import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    FlatList,
    Alert,
    View
} from 'react-native';

class Liste extends  Component{
    state = {
        data: []
    };

    componentWillMount() {
        this.fetchData();
    }

    fetchData = async () => {
        const response = await fetch("https://randomuser.me/api?results=60");
        const json = await response.json();
        this.setState({ data: json.results });
    };

    render(){
        return(
            <View style={{padding:10}}>
                <FlatList
                    data={this.state.data}
                    keyExtractor={(x, i) => i.toString()}
                    renderItem={({ item }) =>
                    {
                        return(
                            <TouchableHighlight onPress={() => Alert.alert(`${item.name.first} ${item.name.last}`)}>
                                <Text style={{padding:5}}>
                                    {`${item.name.first} ${item.name.last}`}
                                </Text>
                            </TouchableHighlight>
                        )
                    }
                       }
                />
            </View>
        );
    }
}

class Header extends Component {
    render() {
        return (
            <View style={styles.viewStyle}>
                <Text style={styles.textStyle}>Random People Namer</Text>
            </View>
        );
    }
}

export default class App extends Component<Props> {
    render() {
        return(
            <View style={{flex:1}}>
                <View style={styles.viewStyle}>
                    <Header/>
                </View>
                <View style={{flex: 1}}>
                    <Liste/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textStyle:{
        fontSize:30
    },
    viewStyle:{
        height:80,
        justifyContent:'center',
        alignItems:'center',
    }
});

