
import Navigation from './components/StackNavigator';
import { PlayerContext } from './components/PlayerContext'
import { ModalPortal} from 'react-native-modals'

export default function App() {
  return (
    <>
      <PlayerContext>
        <Navigation/>
        <ModalPortal/>
      </PlayerContext>
    </>
  );
}


