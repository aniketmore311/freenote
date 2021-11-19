import React, { } from 'react'
import PropTypes from 'prop-types';
import Typography from '../components/Typography';
import { client } from '../client'
import Button from '../components/Button'
import Container from '../components/Container'
import Input from '../components/Input'
import useLoading from '../hooks/useLoading'
import { useMessageStore } from '../stores/messageStore'
import { useUserStore } from '../stores/userStore'
import { theme } from '../styles/theme'
import { Formik } from 'formik'

export default function LoginScreen({ navigation }) {

  const setUser = useUserStore(state => state.setUser);
  const { isLoading, startLoading, stopLoading } = useLoading(false);
  const { setErrorMessage } = useMessageStore();

  return (
    <>
      <Container justifyContent="center" alignItems="flex-start" p="32px">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async ({ email, password }, actions) => {
            startLoading();
            try {
              await client.login({ email, password });
              const user = await client.getUser();
              stopLoading();
              setUser(user);
            } catch (err) {
              setErrorMessage(err.message);
              stopLoading();
            }
            actions.resetForm();
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <>
              <Typography color="blue.500" fontWeight="bold" fontSize="3xl" textAlign="center" width="100%" mb={8}>Login</Typography>

              <Input value={values.email} onChangeText={handleChange('email')} width="100%" placeholder="Email..." mb={4} placeholderTextColor={theme.colors.gray[500]} />

              <Input value={values.password} onChangeText={handleChange('password')} width="100%" placeholder="Password..." placeholderTextColor={theme.colors.gray[500]} />

              <Button loading={isLoading} onPress={handleSubmit} mt={8} py={3} width="100%">
                <Typography color="white" fontSize="lg" textAlign="center" width="100%">login</Typography>
              </Button>

              <Typography mt={4}>
                {"Don't have an account? "}
                <Typography color="blue.500" onPress={() => { navigation.navigate('Signup') }}>signup</Typography>
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
