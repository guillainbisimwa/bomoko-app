import React, { useRef, useState } from "react";
import {
    Dimensions,
    ImageBackground,
    View,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Image,
    Alert,
    Keyboard,
    SafeAreaView,
} from "react-native";
import { Block, Text } from "../../../components";
const { height, width } = Dimensions.get("window");
import { ActivityIndicator, Button, TextInput } from "react-native-paper";
import { COLORS, SIZES } from "../../../constants";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { loginUser, signUpUser } from '../../../redux/userSlice';
import * as ImagePicker from "expo-image-picker";
import NetInfo from "@react-native-community/netinfo";
import Container, { Toast } from 'toastify-react-native';


const Account = ({ navigation, route }) => {
    const { number } = route.params;
    const dispatch = useDispatch();

    const { errorSignUp, isLoadingSignUp, successSignUp, success, error, isLoading } = useSelector((state) => state.user);
    const [loadPic, setLoadPic] = useState(false);

    const [name, setNom] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [email, setEmail] = useState('');

    const [errorName, setErrorNom] = useState(true);
    const [errorPassword, setErrorPassword] = useState(true);
    const [confirmErrorPassword, setConfirmErrorPassword] = useState(true);

    const [errorEmail, setErrorEmail] = useState(true);

    const [mobile, setMobile] = useState(number);
    const [role, setRole] = useState('user');

    const [visible, setVisible] = useState(false);

    const [selectedImage1, setSelectedImage1] = useState('https://raw.githubusercontent.com/guillainbisimwa/bomoko-app/master/assets/icons/gens.png');
    const [selectedImage, setSelectedImage] = useState();

    const navigationV2 = useNavigation();



    const handleImageSelection = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
            base64: true,
        });

        console.log(result);


        if (!result.canceled) {
            const base64Img = `data:image/jpg;base64,${result.assets[0].base64}`; // result.assets[0].base64
            let imgCb = await onCloudinarySaveCb(base64Img);
            //setSelectedImage(result.assets[0].uri);
            setSelectedImage(imgCb);
        }
    };

    const onCloudinarySaveCb = async (base64Img) => {
        try {
            setLoadPic(true)
            var pic = "";
            let apiUrl =
                'https://api.cloudinary.com/v1_1/micity/image/upload';
            let data = {
                file: base64Img,
                upload_preset: 'ml_default'
            };

            await fetch(apiUrl, {
                body: JSON.stringify(data),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST'
            })
                .then(async response => {
                    let data = await response.json();
                    //console.log(data);
                    if (await data.secure_url) {
                        //console.log('Upload successful');
                        setLoadPic(false);
                        pic = await data.secure_url;
                    }
                })
                .catch(err => {
                    console.log('Cannot upload');
                    setLoadPic(false);
                    console.log(err);
                });
            return pic;
        } catch (e) {
            setLoadPic(false);
            console.log("Error while onCloudinarySave", e);
        }
    };


    const handleSignUp = async () => {
        try {
            Keyboard.dismiss();
            // Check internet connections
            const netInfo = await NetInfo.fetch();
            // console.log("netInfo.isConnected", netInfo.isConnected);
            if (!netInfo.isConnected) {
                Alert.alert("Pas de connexion Internet", "Veuillez vérifier votre connexion Internet et réessayer.");
                return;
            }

            if (!name || !password || !email || !mobile || !role) {
                // At least one of the required fields is missing
                // You can display an error message or take appropriate action
                console.log('Please fill in all required fields.');
                // Alert.alert("Attention", "Veuillez completer tous les champs et réessayer.");
                Toast.error('Veuillez completer tous les champs', 'bottom')

            } else {
                if (name.length < 3 || name.length > 20) {
                    setErrorNom(true);
                    Toast.error('Nom invalide', 'bottom')
                    return
                } else {
                    setErrorNom(false);
                }

                if (password.length < 3 || password.length > 20) {
                    setErrorPassword(true);
                    Toast.error('Mots de passe invalide', 'bottom')
                    return
                } else {
                    setErrorPassword(false);
                }
                if (password !== confirmPassword) {
                    setErrorPassword(true);
                    setConfirmErrorPassword(true);
                    Toast.error('Mots de passe ne correspondent pas', 'bottom')
                    return
                } else {
                    setErrorPassword(false);
                    setConfirmErrorPassword(false);
                }

                // Regular expression pattern
                const regex = /[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+/;

                if (!regex.test(email)) {
                    setErrorEmail(true)
                    Toast.error('E-mail incorrect', 'bottom')
                    return
                } else {
                    console.log("Invalid email format");
                    setErrorEmail(false)
                }

                //All required fields are filled, dispatch the action
                dispatch(
                    signUpUser({
                        username: name,
                        name,
                        password,
                        email,
                        mobile,
                        role,
                        cover_url: '',
                        profile_pic: selectedImage ? selectedImage : selectedImage1,
                    })
                );

                // Handle login functionality
                dispatch(loginUser({ mobile, password }))
            }

            //dispatch(loginUser({username:"bvenceslas", password: "1234567890"}))

        } catch (error) {
            Alert.alert("Attention", "Error occurred during login.");

            console.error("Error occurred during login:", error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <ScrollView >
                <ImageBackground
                    style={{ flex: 1, position: "absolute", height, width }}
                    source={require("./../../../assets/login1_bg.png")}
                    blurRadius={10}
                ></ImageBackground>


                <Container position="top" style={{ width: '100%' }} duration={6000} />

                <Block style={styles.m_5}>
                    <View
                        style={{
                            alignItems: "center",
                            marginVertical: 22,
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                height: 130,
                                width: 130,
                                borderRadius: 65,
                                borderColor: COLORS.primary,
                                borderWidth: 2,
                                backgroundColor: COLORS.gray,
                                overflow: 'hidden',
                            }}
                            onPress={handleImageSelection}
                        >
                            {selectedImage && (
                                <Image
                                    source={{ uri: selectedImage }}
                                    style={{ flex: 1, borderRadius: 65 }}
                                />
                            )}


                            {/* <ActivityIndicator animating={loadPic} color='red' size={20} style={{ position: 'absolute', top: 80, left: 80 }} /> */}
                            <ActivityIndicator animating={loadPic} color='red' size={50}
                                style={{ position: 'absolute', top: 39, left: 37 }} />
                            {
                                !selectedImage ?
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
                                    </View> : <></>
                            }

                        </TouchableOpacity>
                    </View>
                    <Text center bold h2>
                        {number}
                    </Text>
                    <Text style={styles.info} center>
                        Veuillez completer les informations de votre profile
                    </Text>

                    <TextInput error={errorName} keyboardType="default" label="Nom d'utilisateur" value={name} onChangeText={setNom}
                        style={styles.input} />
                    <TextInput
                        label="Mots de passe"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={styles.input}
                        error={errorPassword}
                    />

                    <TextInput
                        label="Confirmer le Mots de passe"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                        style={styles.input}
                        error={confirmErrorPassword}
                    />

                    <TextInput error={errorEmail} keyboardType="default"
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
                            // icon="arrow-right"
                            disabled={isLoading || isLoadingSignUp || loadPic}
                            mode="contained" loading={isLoading || isLoadingSignUp || loadPic}
                            onPress={handleSignUp}
                        >
                            S'inscrire
                        </Button>
                    </View>

                </Block>

                <View style={{ width: '100%', padding: 15, }}>
                    <Text >
                        En créant le compte vous acceptez
                        <TouchableOpacity>
                            <Text color={COLORS.gray}>les conditions de notre service</Text></TouchableOpacity>
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mainCon: {
        flex: 1,
    },
    m_5: {
        marginTop: 30,
        marginLeft: 30,
        marginRight: 30,
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
    circularButton: {
        padding: 2,
    }
});

export default Account;

