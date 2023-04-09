import React from "react"
import { StyleSheet, Image, Text, View, ImageBackground, Platform } from "react-native"
import MonthContainer from "./MonthContainer"


export default function NoMonth() {
  return (
    <View>
    <MonthContainer>
        <Text style={styles.SmallText}>Créer ou Joigner un groupe pour commencer!</Text>
    </MonthContainer>
    </View>
  )
}

const styles = StyleSheet.create({

  Container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  SmallText: {
    margin: 75,
    width: 200,
    flexDirection: "column",
    justifyContent: "center",
    color: "rgba(0,0,0,1)",
    fontSize: 20,
    lineHeight: 20,
    fontFamily: "Lato-Regular",
    fontWeight: "400",
    textAlign: "center",
  }
})
