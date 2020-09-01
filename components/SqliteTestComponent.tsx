import React from 'react'
import { View, TouchableOpacity, Text, ScrollView, StyleSheet, StyleProp, TextStyle, ViewStyle } from 'react-native'

import * as SQLite from 'expo-sqlite';
import { SQLTransaction } from 'expo-sqlite';
//(window as any).Expo = Object.freeze({ ...(window as any).Expo, SQLite });
const db = SQLite.openDatabase('db.testDb');

interface Styles {
    container: ViewStyle;
    label: TextStyle;
    flex: ViewStyle;
  }

type Props = {}
type State = {
    data: Array<any>
}

export default class SqliteTestComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            data: []
        };

        // Check if items table exists and create it if not
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, count INT)',
            )
        });
        this.fetchData()
    }

    private fetchData = (): void => {
        db.transaction((tx: SQLTransaction) => {
            tx.executeSql('SELECT * FROM items', [],
            (txObj, {rows}) => {
                const rowAny: any = rows
                this.setState({data: rowAny._array})
            },
            (txtObj, error) => {console.log('Error', error); return true} )
        });
    }
    // event handler for new item creation
    newItem = () => {
        db.transaction(tx => {
        tx.executeSql('INSERT INTO items (text, count) values (?, ?)', ['gibberish', 0],
            (txObj, resultSet) => {
                this.setState({ data: [...this.state.data, 
                    { id: resultSet.insertId, text: 'gibberish', count: 0 }]}) 
            },
            (txObj, error) => {console.log('Error', error); return true})
        })
    }

    increment = (id: number) => {
        db.transaction(tx => {
          tx.executeSql('UPDATE items SET count = count + 1 WHERE id = ?', [id],
            (txObj, resultSet) => {
              if (resultSet.rowsAffected > 0) {
                let newList = this.state.data.map(data => {
                  if (data.id === id)
                    return { ...data, count: data.count + 1 }
                  else
                    return data
                })
                this.setState({ data: newList })
              }
            })
        })
      }

      delete = (id: number) => {
        db.transaction(tx => {
          tx.executeSql('DELETE FROM items WHERE id = ? ', [id],
            (txObj, resultSet) => {
              if (resultSet.rowsAffected > 0) {
                let newList = this.state.data.filter(data => {
                  if (data.id === id)
                    return false
                  else
                    return true
                })
                this.setState({ data: newList })
              }
            })
        })
      }
    

    public render = (): JSX.Element => 
        <View style={styles.container}>
            <Text>Add Random Name with Counts</Text>
            <TouchableOpacity onPress={e => this.newItem()}>
                <Text style={styles.label}>Add New Item</Text>
            </TouchableOpacity>

            <ScrollView>
                {
                    this.state.data && this.state.data.map(data => (
                        <View key={data.id}>
                            <Text style={styles.label}>{data.text} - {data.count}</Text>
                            <TouchableOpacity style={styles.flex}
                                onPress={(e) => this.increment(data.id)}>
                                <Text style={styles.label}> + </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={(e) => this.delete(data.id)}>
                                <Text style={styles.label}> DEL </Text>
                            </TouchableOpacity>
                        </View>
                    ))
                }
            </ScrollView>
        </View>
}

const styles = StyleSheet.create<Styles>({
        container: {
            marginTop: 50
        },
        label: {
            padding: 10,
            fontSize: 18
        },
        flex: {
            flex: 1
        }
})