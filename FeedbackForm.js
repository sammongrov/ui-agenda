import React, { Component } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { Field, reduxForm } from 'redux-form';
import { Colors } from '@ui/theme_default';
import { NavBar, Screen, Icon } from '@ui/components';
import { styles } from 'react-native-theme';
import TextField from '../../../src/idm/ui/components/form/TextField';
import SubmitButton from '../../../src/idm/ui/components/form/SubmitButton';
import {
  isEmailValid,
  isNameValid,
  // isPhoneNumberValid
} from '../../../src/idm/util/validator';

class FeedbackForm extends Component {
  static defaultProps = {
    error: false,
    invalid: false,
    submitting: false,
  };

  state = {
    name: '',
    email: '',
    // phone: '',
    comments: '',
  };

  onSubmit = (values) => {
    console.log('viswanth', values);
  };

  updateSize = (height) => {
    this.setState({
      height,
    });
  };

  render() {
    const { error, handleSubmit, invalid, submitting } = this.props;
    const {
      name,
      email,
      // phone,
      comments,
      height,
    } = this.state;
    const newStyle = { height };
    return (
      <Screen>
        <NavBar
          titleText="Feedback"
          leftComponent={
            <TouchableOpacity
              onPress={() => {
                if (Actions.currentScene === 'FeedbackFormScene') {
                  Actions.pop();
                }
              }}
            >
              <Icon name="chevron-left" color={Colors.NAV_ICON} size={36} />
            </TouchableOpacity>
          }
        />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 10,
            paddingTop: 10,
            backgroundColor: '#F6F7F9',
          }}
        >
          <Field
            autoCapitalize="none"
            component={TextField}
            keyboardType="default"
            name="name"
            // onSubmitEditing={this.focusPasswordInput}
            label="Name"
            onChange={(textName) => {
              this.setState({ name: textName });
            }}
            value={name}
            validate={isNameValid}
            returnKeyType="next"
          />
          <Field
            autoCapitalize="none"
            component={TextField}
            keyboardType="email-address"
            name="email"
            // onSubmitEditing={this.focusPasswordInput}
            label="Email"
            onChange={(textMail) => this.setState({ email: textMail })}
            value={email}
            validate={isEmailValid}
            returnKeyType="next"
          />
          {/* <Field
            autoCapitalize="none"
            // autoFocus={autoFocus}
            component={TextField}
            keyboardType="phone-pad"
            name="phone"
            // onSubmitEditing={this.focusPasswordInput}
            label="Phone"
            onChange={(textPhone) => this.setState({ phone: textPhone})}
            value={phone}
            // ref={(ref) => {
            //   this.emailInput = ref;
            // }}
            validate={validation.normalizeMobile}
            // normalize={validation.normalizeMobile}
            returnKeyType="next"
            // withRef
          /> */}
          <Field
            autoCapitalize="none"
            component={TextField}
            keyboardType="default"
            name="comment"
            label="Comment"
            onChange={(textComment) => this.setState({ comments: textComment })}
            value={comments}
            returnKeyType="next"
            multiline
            onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
            textAreacontainerStyle={newStyle}
            // withRef
          />
          <SubmitButton
            disabled={invalid && !error}
            loading={submitting}
            onPress={handleSubmit(this.onSubmit)}
            text="Submit"
            containerStyle={[styles.marginHorizontal18, styles.marginTop20]}
          />
        </ScrollView>
      </Screen>
    );
  }
}

FeedbackForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.bool,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
};

export default reduxForm({
  form: 'FeedbackForm', // a unique identifier for this form
})(FeedbackForm);

// example working correctly

// import React from 'react'
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from 'react-native'
// import { reduxForm, Field } from 'redux-form'

// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: 'blue',
//     color: 'white',
//     height: 30,
//     lineHeight: 30,
//     marginTop: 10,
//     textAlign: 'center',
//     width: 250
//   },
//   container: {

//   },
//   input: {
//     borderColor: 'black',
//     borderWidth: 1,
//     height: 37,
//     width: 250
//   }
// })

// const submit = values => {
//   console.log('viswanth-submitting form', values)
// }

// const renderInput = ({ input: { onChange, ...restInput }}) => {
//   return <TextInput style={styles.input} onChangeText={onChange} {...restInput} />
// }

// const Form = props => {
//   const { handleSubmit } = props
//   return(
//   <View style={styles.container}>
//   <Text>Email:</Text>
//   <Field name="email" component={renderInput} />
//   <TouchableOpacity onPress={handleSubmit(submit)}>
//     <Text style={styles.button}>Submit</Text>
//   </TouchableOpacity>
// </View>
//   )
// }

// export default reduxForm({
//   form: 'test'
// })(Form)
