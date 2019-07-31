import React,{Component} from 'react';
import {ScrollView,View,Text,Dimensions,TouchableOpacity} from 'react-native';
//import {Button} from 'react-native-elements'
const SCREEN_WIDTH = Dimensions.get('window').width
class Slides extends Component {

	renderLastSlide(index){
		if(index === this.props.data.length -1){
			return(
				<TouchableOpacity
				 buttonStyle={styles.buttonStyle}
				 title="onwards!"
				 raised
				 onPress={this.props.onComplete}
				><Text>sadsd</Text></TouchableOpacity>
				)
		}
	}

	renderSlides(){
		return this.props.data.map((slide,index)=>{
				return(
					<View 
					  key={slide.text} 
					  style={[styles.slideStyle,{backgroundColor:slide.color}]}
					>
						<Text style={styles.textStyle}>{slide.text}</Text>
					{this.renderLastSlide(index)}
					</View>

					)

			})
	}
	render(){
		return(
				<ScrollView
				  pagingEnabled
				  horizontal
				  style={{flex:1}}
				>
					{this.renderSlides()}
				</ScrollView>

			)
	}

}
const styles = {
	slideStyle:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
		width:SCREEN_WIDTH,

	},
	textStyle:{
		fontSize:30,
		color:'white'
	},
	buttonStyle:{
		backgroundColor:'#0288D1',
		
	}
}
export default Slides;