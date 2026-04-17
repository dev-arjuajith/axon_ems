import loginImage from '../../../src/assets/login_container.jpg';
import '../login/LoginPage.css';
import Text from '../../components/Text';
import SizedBox from '../../components/SizedBox';
import logo from '../../assets/logo.svg';
import msLogo from '../../assets/ms_logo.jpg';
import { AppColors } from '../../core/colors';
import FixedBg from '../../components/FixedBg';
import PrimaryButton from '../../components/PrimaryButton';
const LoginPage = () => {
  return (
    <>
      {/* ✅ Background */}
      <FixedBg image={loginImage}/>
      {/* {login container} */}
      <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
        <div className='login-container'>
          <img src={logo} alt="" style={{height: '36px', width: '36px', objectFit: 'contain', display: 'block'}} />
          <SizedBox height={14}></SizedBox>
          <Text size={30} weight={'bold'}> Axon EMS</Text>
          <SizedBox height={8}></SizedBox>
          <Text size={16} weight={'medium'}> The Architectural Professional</Text>
          <SizedBox height={40}></SizedBox>
          {/* {Microsoft signin} */}
          <div className='ms-sigin'>
            <img src={msLogo} alt="" />
            <SizedBox width={8}></SizedBox>
            <Text size={16} weight={'bold'}> Sign in with Microsoft</Text>
          </div>
          <SizedBox height={40}></SizedBox>
          <div style={{width: '100%', display: 'flex', alignItems: 'center'}}>
            <div style={{height: '2px', backgroundColor: AppColors.divider, flex: 1}}></div>
            <SizedBox width={20}></SizedBox>
            <Text size={16} weight={'normal'} color={AppColors.divider}> OR EMAIL </Text>
            <SizedBox width={20}></SizedBox>
            <div style={{height: '2px', backgroundColor: AppColors.divider, flex: 1}}></div>
          </div>
          <SizedBox height={40}></SizedBox>

          {/* Corporate Email */}
          <>
            <div style={{width: '100%', alignItems: "start"}}>
              <Text size={14} weight='600'>Corporate Email</Text>
            </div>
            <SizedBox height={8}></SizedBox>
            <input
              type="email"
              placeholder="name@axonmeridian.com"
              className="input"
            />
          </>
          <SizedBox height={24}></SizedBox>
          <>
            <div style={{width: '100%',display: 'flex', justifyContent: 'space-between'}}>
              <Text size={14} weight='600'>Password</Text>
              <Text size={14} weight='600'>Forgot Password?</Text>
            </div>
            <SizedBox height={8}></SizedBox>
            <div></div>
            <input
              type="password"
              placeholder="**********"
              className="input"
            />
          </>
          <SizedBox height={24}></SizedBox>
          <PrimaryButton text='Sign in'></PrimaryButton>
          <SizedBox height={32}></SizedBox>
          <div style={{display: 'flex'}}>
            <Text size={14} weight={'normal'}> New to the platform? </Text>
            <SizedBox width={5}></SizedBox>
            <Text size={14} weight={'500'}> Request Access </Text>
          </div>
        </div>
      </div>

      <div className='footer'>
        <Text size={14} weight='medium'> © 2024 Axon Meridian. All rights reserved.</Text>
        <div style={{display: 'flex'}}>
          <Text size={14} weight='medium'> Privacy Policy</Text>
          <SizedBox width={32}></SizedBox>
          <Text size={14} weight='medium'> Terms of Service</Text>
          <SizedBox width={32}></SizedBox>
          <Text size={14} weight='medium'> Security</Text>
        </div>
      </div>
    </> 
  )
}

export default LoginPage