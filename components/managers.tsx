import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles'
import { Image, Linking, Text, View } from 'react-native';
import * as DdM from 'zeego/dropdown-menu'
  
function Menu() {

    const people = [
        {
          name: 'James Norgate',
          title: 'Marketing Lead',
          time: '1 yr 10 months',
          image: require('@/assets/images/people/james.jpg')
        },
        {
          name: 'Evie Jennings',
          title: 'Design & Development',
          time: '5 months',
          image: require('@/assets/images/people/evie.jpg')
        },
        {
          name: 'Drew Dwyer',
          title: 'Videographer',
          time: '9 months',
          image: require('@/assets/images/people/drew.jpg')
        }
      ]
    
      const getRandomNumber = () => {
        return Math.floor(Math.random() * 3);
      };
      
      const randomNumber = getRandomNumber();
      console.log(randomNumber);

    return (
      <DdM.Root style={{flexDirection: 'row', justifyContent: 'center', height: 100, backgroundColor: Colors.primary}}>
        <DdM.Trigger style={{flexDirection: 'row', height: 100, flex: 1, justifyContent: 'center'}}>
          <View style={{flex: 4, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 0}}>
              <Image source={people[randomNumber].image} style={[defaultStyles.rounded, {height: 75, width: 75, borderColor: Colors.green}]} />
          </View>
          <View style={{flex: 6, justifyContent: 'center', height: 100, width: '100%', alignSelf: 'flex-start'}}>
              <Text style={[defaultStyles.screenHeader, {color: Colors.secondary, fontSize: 20}]}>{people[randomNumber].name}</Text>
              <Text style={[defaultStyles.welcomeText, {color: Colors.darkGray}]}>{people[randomNumber].title} {'\n'}Lasatec {'\n'}
              {people[randomNumber].time}</Text>
          </View>
        </DdM.Trigger>
        <DdM.Content loop={false} side="bottom" align="start" alignOffset={10} avoidCollisions={true} collisionPadding={8} sideOffset={0}>
          <DdM.Item key="linkedIn">
            <DdM.ItemTitle>LinkedIn</DdM.ItemTitle>
          </DdM.Item>
          <DdM.Item key="email">
            <DdM.ItemTitle>Email</DdM.ItemTitle>
          </DdM.Item>
        </DdM.Content>
      </DdM.Root>
    )
  }

export default Menu;