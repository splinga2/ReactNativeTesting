import React from 'react'
import { View, TextInput, Text } from 'react-native'

type Props = {}
type State = {
    text: string
}

export default class PizzaTranslator extends React.Component<Props, State> {
    public state: State = {
        text: ''
    }

    public render = (): JSX.Element => {
        const text: string = this.state.text;

        return <View style={{ padding: 10 }}>
            <TextInput style={{
                height: 40
            }}
                placeholder="Type here to translate"
                onChangeText={(text): void => this.setState({ text: text })}
                defaultValue={text} />
            <Text style={{ padding: 10, fontSize: 42 }}>
                {text.split(' ').map((word) => word && '🍕').join(' ')}
            </Text>
        </View>
    }
}