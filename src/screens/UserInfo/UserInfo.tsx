import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";

import colors from "../../constants/colors";
import useUser from "../../hooks/useUser";

const UserInfo = () => {
  const { user } = useUser();

  return (
    <SafeAreaView>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.adminInfo}>
        {user.isAdmin ? "This user is Admin" : "This user isn't Admin"}
      </Text>
    </SafeAreaView>
  );
};

export default UserInfo;

const styles = StyleSheet.create({
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 16,
  },
  email: {
    fontSize: 18,
    marginTop: 16,
    textAlign: "center",
  },
  adminInfo: {
    color: colors.text.important,
    marginTop: 18,
    textAlign: "center",
  },
});
