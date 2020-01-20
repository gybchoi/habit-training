import React from 'react';
import {View, Text, StyleSheet, Linking} from 'react-native';
import Option from './Option';
import DeviceInfo from 'react-native-device-info';

export default class Others extends React.Component {
  sendDeveloperEmail(title, content = '') {
    Linking.openURL(
      `mailto:gybchoi@gmail.com?subject=${title}&body=${content}`,
    );
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <Option
          text="이 앱에 대한 의견을 보내주세요!"
          icon="star"
          style={{borderTopWidth: 0.5, height: 100, marginBottom: 55}}
          iconstyle={{color: '#ffae42'}}
        />
        <Option
          text="테마 변경"
          icon="feather"
          style={{borderTopWidth: 0.5}}
          rightText="WhiteDay"
        />
        <Option
          text="앱 정보"
          icon="help-circle"
          onPress={() => navigation.navigate('AppInfo')}
        />
        <Option
          text="버그 신고하기"
          icon="cpu"
          style={{borderTopWidth: 0.5, marginTop: 30}}
          onPress={() =>
            this.sendDeveloperEmail(
              '버그 리포트 - 매일매일 습관 트레이닝',
              `<b>에러 로그(혹은 발생한 버그의 내용)와 함께 아래에 구체적으로 내용을 작성해주세요.</b><br>
              System: ${DeviceInfo.getSystemName()} ${DeviceInfo.getSystemVersion()}<br>
              Device: ${DeviceInfo.getModel()}<br>
              ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ<br>`,
            )
          }
        />
        <Option
          text="문의/건의 하기"
          icon="mail"
          onPress={() =>
            this.sendDeveloperEmail(
              '문의 및 건의 - 매일매일 습관 트레이닝',
              `<b>아래에 문의 및 건의 사항을 적어주세요.</b><br>
            ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ<br>`,
            )
          }
        />
        <Option
          text="함께 개발하고 싶습니다(!)"
          icon="code"
          onPress={() => this.sendDeveloperEmail('함께 개발하고 싶습니다(!)')}
        />
        <Option
          text="개발자에게 커피 한잔 사주기"
          icon="coffee"
          iconstyle={{color: 'brown'}}
        />
        <View style={styles.version_container}>
          <Text style={styles.version_text}>V 1.0.0</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 40,
  },
  version_container: {
    alignItems: 'flex-end',
  },
  version_text: {
    color: 'gray',
    fontStyle: 'italic',
    marginRight: 10,
    marginTop: 5,
  },
});
