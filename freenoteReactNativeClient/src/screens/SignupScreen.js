import React, { } from 'react'
import PropTypes from 'prop-types';
import Typography from '../components/Typography';
import Button from '../components/Button'
import Container from '../components/Container'
import Input from '../components/Input'
import useLoading from '../hooks/useLoading'
import { useMessageStore } from '../stores/messageStore'
import { theme } from '../styles/theme'
import { Formik } from 'formik'
import { client } from '../client';

export default function LoginScreen({ navigation }) {

  const { isLoading, startLoading, stopLoading } = useLoading(false);
  const { setErrorMessage, setSuccessMessage } = useMessageStore();

  return (
    <>
      <Container justifyContent="center" alignItems="flex-start" p="32px">
        <Formik
          initialValues={{
            firstname: "",
            lastname: "",
            email: "",
            password: "",
          }}
          onSubmit={async ({ firstname, lastname, email, password }, actions) => {
            startLoading();
            try {
              await client.signup({ email, password, firstname, lastname });
              setSuccessMessage('signup successful');
              stopLoading();
              navigation.navigate('Login');
            } catch (err) {
              setErrorMessage(err.message);
              stopLoading();
            }
            actions.resetForm();
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <>
              <Typography color="blue.500" fontWeight="bold" fontSize="3xl" textAlign="center" width="100%" mb={8}>Signup</Typography>

              <Input value={values.firstname} onChangeText={handleChange('firstname')} width="100%" placeholder="Firstname..." mb={4} placeholderTextColor={theme.colors.gray[500]} />

              <Input value={values.lastname} onChangeText={handleChange('lastname')} width="100%" placeholder="Lastname..." mb={4} placeholderTextColor={theme.colors.gray[500]} />

              <Input value={values.email} onChangeText={handleChange('email')} width="100%" placeholder="Email..." mb={4} placeholderTextColor={theme.colors.gray[500]} />

              <Input value={values.password} onChangeText={handleChange('password')} width="100%" placeholder="Password..." placeholderTextColor={theme.colors.gray[500]} />

              <Button loading={isLoading} onPress={handleSubmit} mt={8} py={3} width="100%">
                <Typography color="white" fontSize="lg" textAlign="center" width="100%">signup</Typography>
              </Button>

              <Typography mt={4}>
                {"Already have an account? "}
                <Typography color="blue.500" onPress={() => { navigation.navigate('Login') }}>login</Typography>
              </Typography>

            </>
          )}
        </Formik>
      </Container>
    </>
  )
}

LoginScreen.propTypes = {
  navigation: PropTypes.object,
  params: PropTypes.object,
}
