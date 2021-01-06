import React from 'react';
import { bindDevice } from '../service/deviceService'
import { connect } from '../data/connect';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router';


interface StateProps {
	userId?: number;
	userName?: string;
}

interface BindDeviceProps extends StateProps, RouteComponentProps { }

const BindDevice: React.FC<BindDeviceProps> = ({ userId, userName, history }) => {
	console.log('------>BindDevice', userId, userName)
	if (!userId || !userName) {
		history.push('/login', {direction: 'none'})
	} else {
		bindDevice(userId, userName).then(data => {
			console.log('---->data', data);
			// @ts-ignore
			const url = data?.data?.url || ''
			// window.location.href= url;
			window.open(url, '_self');
		})
	}
  return null;
};

// export default RedirectToLogin;

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
		userId: state.user.userId,
		userName: state.user.username
  }),
  component: withRouter(BindDevice)
})
