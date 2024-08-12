import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles'
import { Image } from 'react-native';
import * as DdM from 'zeego/dropdown-menu'
  
function ProfilePicture() {

    return (
      <DdM.Root>
        <DdM.Trigger style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
            <Image source={require('@/assets/images/people/jay.jpg')} style={[defaultStyles.rounded]} />
        </DdM.Trigger>
        <DdM.Content loop={false} side="bottom" align="start" alignOffset={10} avoidCollisions={true} collisionPadding={8} sideOffset={0}>
          <DdM.Item key="accountsettings">
            <DdM.ItemTitle>Account Settings</DdM.ItemTitle>
          </DdM.Item>
          <DdM.Item key="logout">
            <DdM.ItemTitle>Logout</DdM.ItemTitle>
          </DdM.Item>
        </DdM.Content>
      </DdM.Root>
    )
  }

export default ProfilePicture;