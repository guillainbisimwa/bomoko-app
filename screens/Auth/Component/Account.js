import React, { useRef, useState } from "react";
import {
    Dimensions,
    ImageBackground,
    View,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Image,
} from "react-native";
import { Block, Text } from "../../../components";
const { height, width } = Dimensions.get("window");
import { ActivityIndicator, Button, TextInput } from "react-native-paper";
import { COLORS, SIZES } from "../../../constants";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";


const Account = ({ navigation, route }) => {

    const { errorSignUp, isLoadingSignUp, successSignUp, success, error, isLoading } = useSelector((state) => state.user);
    const [loadPic, setLoadPic] = useState(false);

    const [name, setNom] = useState('');
    const [password, setPassword] = useState('');

    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [role, setRole] = useState('user');

    const [visible, setVisible] = useState(false);

    const [selectedImage, setSelectedImage] = useState('https://raw.githubusercontent.com/guillainbisimwa/bomoko-app/master/assets/icons/gens.png');

    const navigationV2 = useNavigation();

    const { number } = route.params;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ImageBackground
                style={{ flex: 1, position: "absolute", height, width }}
                source={require("./../../../assets/login1_bg.png")}
                blurRadius={10}
            ></ImageBackground>

            <ScrollView style={styles.container}>

                <Block style={styles.m_5}>
                    <View
                        style={{
                            alignItems: "center",
                            marginVertical: 22,
                        }}
                    >
                        <TouchableOpacity style={{
                            height: 130,
                            width: 130,
                            borderRadius: 85,
                            borderWidth: 2,
                            borderColor: COLORS.primary,
                            backgroundColor: COLORS.gray
                        }} >
                            {/* onPress={handleImageSelection} */}

                            {/* <ActivityIndicator animating={loadPic} color='red' size={20} style={{ position: 'absolute', top: 80, left: 80 }} /> */}
                            <ActivityIndicator animating={true} color='red' size={50}
                                style={{ position: 'absolute', top: 39, left: 37 }} />

                            <View
                                style={{
                                    position: "absolute",
                                    top: 50,
                                    right: 50,
                                    //zIndex: 9999,
                                }}
                            >
                                <MaterialIcons
                                    name="photo-camera"
                                    size={32}
                                    color={COLORS.primary}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text center bold h2>
                        {number}
                    </Text>
                    <Text style={styles.info} center>
                        Veuillez completer les informations de votre profile
                    </Text>

                    <TextInput error={errorSignUp} keyboardType="default" label="Nom d'utilisateur" value={name} onChangeText={setNom}
                        style={styles.input} />
                    <TextInput
                        label="Mots de passe"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={styles.input}
                        error={errorSignUp}
                    />

                    <TextInput error={errorSignUp} keyboardType="default"
                        label="E-mail" value={email}
                        onChangeText={setEmail} style={styles.input} />

                    {
                        visible ? <Text style={{ color: COLORS.red }} >Mots de passe ou Numéro de téléphone invalide </Text> : <></>
                    }


                    <View style={styles.btnContainer}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('CountyPhone', {
                                number: number,
                                code: '1234'
                            })
                        }}>
                            <Text bold color={COLORS.white}>
                                Annuler
                            </Text>
                        </TouchableOpacity>

                        <Button
                            style={styles.circularButton}
                            icon="arrow-right"
                            mode="contained"
                            onPress={() => {
                                console.log("valid");

                            }}
                        >
                            Suivant
                        </Button>
                    </View>

                </Block>

                <View style={{ width: '100%', padding: 10, }}>
                    <Text >
                        En créant le compte vous acceptez
                        <TouchableOpacity>
                            <Text color={COLORS.gray}>les conditions de notre service</Text></TouchableOpacity>
                    </Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    mainCon: {
        flex: 1,
    },
    container: {
        // flex: 1,
    },
    m_5: {
        margin: 30,
        paddingTop: 30
    },
    input: {
        //width: '70%',
        marginBottom: 10,
    },
    info: {
        marginTop: 5,
        marginBottom: 15,
    },
    btnContainer: {
        //flex:2,
        marginTop: 25,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});

export default Account;

