import React from 'react'
import { View, TextInput, Text, FlatList, ScrollView, ListRenderItemInfo, NativeSyntheticEvent, TextInputEndEditingEventData, TextInputSubmitEditingEventData } from 'react-native'

type Props = {}
type State = {
    text: string,
    names: Array<string>
}

export default class NameList extends React.Component<Props, State> {
    public state: State = {
        text: '',
        names: [
            'Devin',
            'Dan',
            'Dominic',
            'Jackson',
            'James',
            'Joel',
            'John',
            'Jillian',
            'Jimmy',
            'Julie',
        ]
    }

    private addToList = (name: string): void => {
        this.setState({
            names: [...this.state.names, name],
            text: ''
        })
    }

    public render = (): JSX.Element => {
        const text: string = this.state.text;
        const names = this.state.names;

        return <View style={{ padding: 10, borderColor: 'black', borderWidth: 10, flex: 1, width: '100%'}}>
            <FlatList
                style={{ height: 10 }}
                data={names}
                renderItem={(item: ListRenderItemInfo<string>) =>
                    <Text style={{ padding: 10, fontSize: 18 }} key={item.item}>{item.item}</Text>
                }
            >
            </FlatList>
            <ScrollView scrollEnabled={false}>
                <TextInput style={{
                    height: 40
                }}
                    placeholder="Type here to translate"
                    onChangeText={(text): void => this.setState({ text: text })}
                    onSubmitEditing={(e: NativeSyntheticEvent<TextInputSubmitEditingEventData>): void => this.addToList(e.nativeEvent.text)}
                    defaultValue={text} />
            </ScrollView>

        </View>
    }
}