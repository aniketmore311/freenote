import React from 'react'
import Typography from './Typography'
import PropTypes from 'prop-types';
import Box from './Box';
import Icon from 'react-native-vector-icons/MaterialIcons'

export default function Header(props) {
  return (
    <Box width="100%" height="100%" display="flex" justifyContent="center" flexDirection="row" alignItems="center">
      <Box pl="25%" width="80%" height="100%" display="flex" justifyContent="center" flexDirection="row" alignItems="center">
        <Typography flex="5" fontWeight="bold" fontSize="lg" >
          {props.route.name}
        </Typography>
      </Box>
      <Box width="20%" mr="10%" height="100%" display="flex" justifyContent="center" flexDirection="row" alignItems="center">
        <Icon name="menu" color="black" size={30}/>
      </Box>
    </Box >
  )
}

Header.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
}
