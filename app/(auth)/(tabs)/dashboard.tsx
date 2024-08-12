import { Dimensions, View, Text, Image, StyleSheet, Button } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'
import Menu from '@/components/managers'
import ProfilePicture from '@/components/profilepicture'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Barchart from '@/components/barchart'
import Line from '@/components/line'
import Pie from '@/components/pie'
/* 
  React Carousel
*/
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
} from "react-native-reanimated-carousel";

const data = [
  <View style={{flex: 1}}>
    <Text style={[defaultStyles.screenHeader, {color: Colors.secondary, fontSize: 14 }]}>Budget Overview</Text>
    <Barchart/>
  </View>,
  <View style={{flex: 1}}>
    <Text style={[defaultStyles.screenHeader, {color: Colors.secondary, fontSize: 14 }]}>User Engagement</Text>
    <Line/>
  </View>,
  <View style={{flex: 1}}>
    <Text style={[defaultStyles.screenHeader, {color: Colors.secondary, fontSize: 14 }]}>Target Demographics</Text>
    <Pie/>
  </View>,
];

const width = Dimensions.get("window").width;

const Page = () => {
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  
  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };

  const time = new Date().getHours();
  let greeting = 'Good Morning';
  if (time >= 12 && time < 18) {
    greeting = 'Good Afternoon';
  } else if (time >= 18 && time < 24) {
    greeting = 'Good Evening';
  }

  const getRandomNumber = (floor: number, ceiling: number): number => {
    const randomNumber = Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
    return randomNumber;
  };

  const getNumberFormattedWithCommas = (number: number): string => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const budgetTotal = getRandomNumber(4000, 10000);
  const budgetTotalFormatted = getNumberFormattedWithCommas(budgetTotal);
  const remainingBudget = getRandomNumber(budgetTotal / 10,budgetTotal).toFixed(0);
  const remainingBudgetFormatted = getNumberFormattedWithCommas(remainingBudget);

  let budgetColor = '';
  if ((budgetTotal / 4) > remainingBudget) {
    budgetColor = 'red';
    console.log('You have spent more than 75% of your budget');
  } else {
    budgetColor = 'green';
    console.log('You have spent less than 75% of your budget');
  }
  return (
    <View style={{flex: 1}}>
      <View style={[defaultStyles.mainContainer, {flex: 4,backgroundColor: Colors.secondary}]}>
        <View style={{flexDirection: 'row', flex: 1, height: 100, maxHeight: 75}}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={defaultStyles.screenHeader}>Dashboard</Text>
            <Text style={defaultStyles.welcomeText}>{greeting}, Jay!</Text>
          </View>
          <ProfilePicture/>
        </View>

        <View style={{flex: 1, backgroundColor: Colors.primary, padding: 10, marginTop: 24, paddingHorizontal: 20, borderRadius: 20}}>
          <Text style={[defaultStyles.screenHeader, {color: Colors.secondary, fontSize: 18}]}>Account Manager</Text>
          <Menu/>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.primary, borderRadius: 20}}>
            <View style={{flex: 3}}>
              <Text style={{fontFamily: 'FoundersGrotesk'}}>Total Budget</Text>
              <Text style={{fontFamily: 'FoundersGrotesk', fontSize: 24}}>£{budgetTotalFormatted}</Text>
            </View>
            <View style={{flex: 3}}>
              <Text style={{fontFamily: 'FoundersGrotesk'}}>Available Budget</Text>
              <Text style={{fontFamily: 'FoundersGrotesk',fontSize: 24, color: budgetColor}}>£{remainingBudgetFormatted}</Text>
            </View>
            <View style={{flex: 2, justifyContent: 'center'}}>
                <TouchableOpacity>
                  <Text style={{fontFamily: 'FoundersGrotesk', color: Colors.blue, fontSize: 18, textAlign: 'right'}}>Edit</Text>
                </TouchableOpacity>
            </View>
        </View>
        </View>
      </View>


      <View style={{flex: 6, paddingHorizontal: 20, backgroundColor: Colors.primary}}>
        <Text style={[defaultStyles.screenHeader, {color: Colors.secondary, marginTop: 20}]}>At a glance</Text>
        <Carousel
          ref={ref}
          width={width - 40}
          height={width - 100}
          data={data}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
              }}
            >
              { item }
            </View>
          )}
        />
      </View>
    </View>
  )
}


export default Page