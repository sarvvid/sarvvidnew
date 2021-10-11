import React, {useState,useEffect} from "react";
import styled from 'styled-components';
import { Text,Animated, View, Image, TouchableOpacity, FlatList, TextInput,NativeModules,StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import LinearGradient from 'react-native-linear-gradient';
import { useNavigationParam } from '@react-navigation/native';
import Footer from '../components/footer';
import FileViewer from 'react-native-file-viewer';
import SweetAlert from 'react-native-sweet-alert';
import { Progress } from 'react-sweet-progress';
import Toast from 'react-native-toast-message';
import { FlatGrid } from "react-native-super-grid";
import ImagePicker from 'react-native-image-crop-picker';
import account from '../img/account.png'
import filestructure1 from "../files";
import RNFS from 'react-native-fs'
import { useTheme } from '../contexts/themeContext';
import ImageView from "react-native-image-viewing";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
const { RNVirgilCrypto } = NativeModules;
import search from '../img/search.png';
import RNFetchBlob from 'rn-fetch-blob'
// import * as DocumentPicker from 'expo-document-picker';
import Ping from 'react-native-ping';
import axios from 'axios'
import AnimatedBar from "react-native-animated-bar";
import futch from './progress';
import loading12 from '../img/loading1.gif'
import { ScrollView } from 'react-native-gesture-handler';
import { add } from 'react-native-reanimated';


const images = [
    {
      uri: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
    },
    {
      uri: "https://images.unsplash.com/photo-1573273787173-0eb81a833b34",
    },
    {
      uri: "https://images.unsplash.com/photo-1569569970363-df7b6160d111",
    },
  ];
//import DocumentPicker from 'react-native-document-picker';

const normalizeFilePath = (path) => (path.startsWith('file://') ? path.slice(7) : path);
export default function FileDetails(navigation) {

    const [documentUrl, setDocumentUrl] = useState('');
    const [imei,setimei] = React.useState('')
    const [auth,setauth] = React.useState('')
    // const [filedata,setdata] = React.useState([])
    const [settedping,setping] = useState(0)
    const [done,setdone] = React.useState(false)
    const [visible, setIsVisible] = useState(false);
    console.log("DFsdfsddsfsd>>>>>>>>>>>>>>>>>>>>>>",navigation.route.params.type)
    const documentType = navigation.route.params.type;
    const [loading,setloading] = React.useState(false);
    const [fill,setfill] = React.useState(0)
    const [avatar_uri,seturi] = React.useState(require("../img/avatar/male1.png"))
    const [loading1,setloading1] = React.useState(false)
    useEffect(()=>{
        setdone(true)
        setdone(false)
       
    },[])
    const {arr,path}= navigation.route.params;
    useEffect(() => {
        console.log("Hi i am data",data);
        console.log("Hi i am path",path);
        console.log("Hi i am arr",arr);
    })

    const [data,setdata] = React.useState([])
    const [filestructure,setfilestructure] = React.useState({})

  
    useEffect(()=>{
      (async()=>{
  
      })()

    }, [])
    useEffect(()=>{
        (async()=>{
    setloading1(true)
    var temp = []
    var files = filestructure1
    // files = JSON.parse(files)
    console.log("dfdffd>>>>>>>>",files)
    setfilestructure(files)
    for(let i=0;i<arr.length;i++){
      temp.push(files[arr[i]])
    }
    setdata(temp)
    console.log("DDDDDDDDDDDATTTTTTTTTTAAAAAAAA>>>>>>>>1",temp)
    var token = await AsyncStorage.getItem("userToken")
        var ping_res = 0;
				let i;
				for(i = 0; i < 10;i++){
				const ms = await Ping.start("103.155.73.35",{timeout : 500});
				ping_res += ms;
			}
			ping_res = ping_res /10;
			setping(ping_res);
	fetch(`http://103.155.73.35:3000/ms/?ms=${ping_res}&IMEI=${token}`).then(resp=>{
                console.log("pinged");
            })
    const IMEI = await AsyncStorage.getItem("userToken")
    // AsyncStorage.setItem("authtoken","9ad29ad255a80c8a65aa51f6541d55a807b165aa")
    const at = await AsyncStorage.getItem("authtoken")
    setimei(IMEI)
    setauth(at)
    await fetch(`http://103.155.73.35:3000/files/?IMEI=${IMEI}&ping=${ping_res}&type=${navigation.route.params.type}`,{
        method: 'post',
        headers:{
            'Content-type' : 'multipart/form-data',
            'Authtoken' : at
        }
    }).then(res=>{
        res.json().then(resp=>{
            console.log(resp["data"])
            // const temp = []
            // for(let i=0;i<resp["data"].length;i++){
            //     temp.push({
            //         key : parseInt(i+1),
            //         ...resp["data"][i]
            //     })
            // }
            // setdata(resp["data"])
        })
        // console.log(res)
        // if(res.success){
        //     console.log(res.data)
        // }
    })
    const g = await AsyncStorage.getItem('gender');
    console.log(g)
    if (g == 'male1'){
        seturi(require('../img/avatar/male1.png'))
    }
    else if(g=="female1"){
        seturi(require("../img/avatar/female1.png"))
    }
    else if(g=="male2"){
        seturi(require("../img/avatar/male2.png"));
    }
    else if(g=="male3"){
        seturi(require("../img/avatar/male3.png"));
    }
    else if(g=="female3"){
        seturi(require("../img/avatar/female3.png"));
    }
    setloading1(false)

           } )()

    },[done])
    const uploadFile = async () => {
       
        // let result = await DocumentPicker.getDocumentAsync({type: documentType});
        // setDocumentUrl(result.uri);
        // alert(result.uri);
        let result = await ImagePicker.openPicker({multiple:true})
        const mypub = await AsyncStorage.getItem('mypub')
        console.log("dfdfdfdf>>>>>>>>>>>>",mypub)
        let i = 0;
        console.log(result)
        const paths = [];
        for(let i = 0;i<result.length;i++){
            var temp = result[i].path;
            temp = temp.replace("file:///data/user/0/com.sarvvid/cache/react-native-image-crop-picker/",'')
            console.log(temp)
            paths.push(temp)
        }
        console.log(paths)
        let data = new FormData();
        const ut = await AsyncStorage.getItem("userToken");
        const id = ut
        data.append('IMEI',id);
        data.append('name', 'avatar');
        for(let i=0;i<paths.length;i++){
            const encryptedPath = await RNVirgilCrypto.encryptFile(
                normalizeFilePath(result[i].path),
                RNFetchBlob.fs.dirs.DownloadDir + `/encypted_temp_${i}`,
                [mypub],
                false
            );
            
            data.append("doc[]",{
                uri: 'file://'+encryptedPath,
                type: result[i].mime,
                name: paths[i]
            })
        }
        const config = {
            method: 'POST',
            headers: {
             'Content-Type': 'multipart/form-data',
            },
            body: data,
           };
        // AsyncStorage.setItem("authtoken","bc697cfd541d55a8bc69de6a09447e7e9dc67c6d")
        const at = await AsyncStorage.getItem("authtoken");
    
    console.log(data)
     var respo =  await futch(`http://103.155.73.35:3000/upload?ping=${settedping}&IMEI=${ut}&type=${navigation.route.params.type}`, {
        method: 'post',
        body : data,
        headers:{
            'Content-type' : 'multipart/form-data',
            'Authtoken' : at
        },
     },(progressEvent)=>{
         const tem = (progressEvent.loaded/progressEvent.total)*100
         setloading(true)
         setfill(tem)
     } )
     setloading(false)
     setfill(0)

     console.log(respo)
     respo = JSON.parse(respo.response)
     for(let i=0;i<paths.length;i++){
         RNFS.unlink(`${RNFetchBlob.fs.dirs.DownloadDir}/encypted_temp_${i}`)
     }
     if(respo.success){
        AsyncStorage.setItem("authtoken",respo.newtoken)
        SweetAlert.showAlertWithOptions({
            title: 'Uploaded Successfully',
            subTitle: '',
            confirmButtonTitle: 'OK',
            confirmButtonColor: '#000',
            style: 'success',
            cancellable: true
          },
            callback =>{ console.log('callback')
            setdone(true)
    });
       
     } 
     else{
        SweetAlert.showAlertWithOptions({
            title: 'OOPS!..',
            subTitle: 'Something went wrong',
            confirmButtonTitle: 'OK',
            confirmButtonColor: '#000',
            style: 'error',
            cancellable: true
          },
            callback => console.log('callback'));
     }
        // let filename = documentUrl.split('/').pop();
        
        // let match = /\.(\w+)$/.exec(filename);
        // let type = match ? `${match[1]}` : pin``;

        // console.log(type)
        
        // const form = new FormData();

        // form.append(documentType, {
        // uri: documentUrl,
        // type: type,
        // name: result.name,
        // });

        // fetch('http://localhost:19002', {
		// 	method: 'POST',
		// 	body: form
		// }).then(response => {
		// 	console.log(response)
		// }).catch(err => {
		// 	console.log(err);
		// });


    }

    const dummy =  [
        {
            key:"1",
        },
        {
            key:"2",
        },
        {
            key:"3",
        },
        {
            key:"4",
        },
        {
            key:"5",
        },
        {
            key:"6",
        },
        {
            key:"7",
        },
        {
            key:"8",
        },
        {
            key:"9",
        },
    ]
    
    const darkTheme = useTheme();

    function background() {
        return darkTheme ? ['#2c8378','#35448f' ] : [  '#78efe1','#3755f9'] ;
    }

    const scY = useState(new Animated.Value(0))[0];
    const scH = useState(new Animated.Value(150))[0];
    const [heightA, setHeightA] = useState(130);

    const [currentPosition,setCurrentPosition] = useState(0)
    const handleScroll = (e) => {
        let a = e.nativeEvent.contentOffset.y
        //console.log(e.nativeEvent.contentOffset.y)
        if(currentPosition-a<0) {
            console.log('scrolling up')
            setCurrentPosition(a)
            Animated.timing(scY, {
                toValue:-300,
                duration:300,
               
                useNativeDriver: true,
            }).start();
            // Animated.timing(scH, {
            //     toValue:0,
            //     duration:3000,

            //     useNativeDriver:false
            // }).start()


        } else if (currentPosition-a>0) {
            console.log('scrolling down')
            setCurrentPosition(a)
            Animated.timing(scY, {
                toValue:0,
                duration:300,
                useNativeDriver: true,
            }).start();
            Animated.timing(scH, {
                toValue:150,
                duration:300,
                useNativeDriver: false
            }).start();
        }
    }



    // const data = filedata

    return(
        <View style = {{flex: 1 , backgroundColor: `${ darkTheme ? "#292929" : "#fff"}`}}>
            {/* <Text>{navigation.route.params.title}</Text> */}
            


            <Container >
                <LinearView style = {[{height:heightA}, {transform:[{scale:1}, {translateY:scY}]}]}>
                    <LinearGradient start = {{x:0, y:0}} end = {{x:1, y:1}} colors={background()}  >
                        <Header>
                            <HeaderText>{ navigation.route.params.title}</HeaderText>
                            <Image source = {avatar_uri}/>
                        </Header>
                    </LinearGradient>
                </LinearView>
                {loading1 ? <View style = {{height:"100%", width:"100%",alignItems:"center",top:130}}>
                    <Image style = {{resizeMode: "contain", height:200, width:200}} source = {loading12}/>
                    <TouchableOpacity onPress={()=>{
                        setdone(false)
                    }}>
                        <Text style = {{color : darkTheme ? "#ccc" : "#444" }}>
                           Please click here if it take too much time
                        </Text>
                    </TouchableOpacity>
            </View> :
            <>
                <Input style = {[ {transform:[{scale:1}, {translateY:scY}]}]}>
                    <TextInput style = {{width:"80%", color : darkTheme ? "#ccc" : "#000"}} placeholder = "Search files" placeholderTextColor = {darkTheme ? "#ccc" : '#444'} returnKeyLabel = "send"/>
                    <TouchableOpacity>
                        <Image source = {search}/>
                    </TouchableOpacity>
                </Input>
                {loading ?
    
                 <AnimatedBar
                 progress={(fill/100)}
                 height={null}
                 borderColor="#DDD"
                 barColor="#00b3ff"
                 borderRadius={200}
                 borderWidth={3}
               >
                 <View style={[styles.row, styles.center]}>
                   <Text style={[styles.barText, { fontSize: 12 }]}>
                     Uploading... {Math.round(fill)}%
                   </Text>
                 </View>
               </AnimatedBar>
            
            
            
                :  <View style = {{paddingHorizontal:20, width: "100%"}}>
                <AddCard onPress = {() => uploadFile()}  style = {[{ backgroundColor:  navigation.route.params.addcolor}, {transform:[{scale:1}, {translateY:scY}]}]}>
                    <Image source = { navigation.route.params.add}/>
                    <AddText>{`add new ${ navigation.route.params.title}`}</AddText>
                </AddCard>
            </View>}
               
                <Animated.View style = {[{width: "90%"}, {transform:[{translateY:scY}]}]}>
                <FlatGrid
    itemDimension={130}
    data={data}
    renderItem={({ item }) => (<TouchableOpacity style={{height:100,padding:20}} onPress={()=>{
  if(item.type="__folder__"){

    navigation.push("Filedetails", { arr:item.children,path:`/${item.name}`})
  }
    }}><Text>{item.name}</Text></TouchableOpacity>)}
  />
                </Animated.View>
                </>
                }

            </Container>


            <Footer navigation = {navigation.navigation}/>
            <Toast ref={(ref) => Toast.setRef(ref)} />

        </View>
    )
}

const Container = styled.View`
    width:100%;
    flex: .9;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
   
`

const LinearView = styled(Animated.View)`
    width: 100%;
   
    overflow: hidden;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
`

const HeaderText = styled.Text`
    font-size: 35px;
    font-weight: bold;
    margin:0px;
    includeFontPadding:false;
    color: #fff;
   
    
    
`

const Header = styled.View`
    padding: 25px;
    padding-bottom: 35px;
    padding-top:55px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
`

const AddCard = styled.TouchableOpacity`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    padding: 12px;
    border-radius: 25px;
    margin-top: 15px;
    
`

const AddText = styled.Text`
    color: #fff;
    font-size: 25px;
    font-weight: bold;
    margin-left: 10px;
`

const Card1 = styled.TouchableOpacity`
    width: 100%;
    padding: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: ${props => props.dark ? "#434861" : "#fff"};
    border-radius: 15px;
    margin-vertical: 10px;
    elevation:5;
`
const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color : ${props => props.dark ? "#fff" : "#000"};
`
const SectionDetails = styled.Text`
    opacity: .5;
    color : ${props => props.dark ? "#fff" : "#000"};
`

const Section1 = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`
const Section2 = styled.View`
    
`

const Input = styled(Animated.View)`
margin-top: 25px;
 width: 90%;
 margin-bottom:10px ;
 border-radius: 25px;
 border-width: 2px;
 border-color: #0092ff;
 padding:5px;
 padding-left:15px;
 padding-right:15px;
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
`




const styles = StyleSheet.create({
    points: {
      textAlign: 'center',
      color: '#7591af',
      fontSize: 50,
      fontWeight: '100',
    },
    container: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#152d44',
      padding: 50,
    },
    pointsDelta: {
      color: '#4c6479',
      fontSize: 50,
      fontWeight: '100',
    },
    pointsDeltaActive: {
      color: '#fff',
    },

      rowText: {
        marginRight: 20,
      },
      row: {
        flexDirection: "row",
      },
      center: {
        justifyContent: "center",
        alignItems: "center",
      },
      barText: {
        backgroundColor: "transparent",
        color: "#FFF",
      },
  });