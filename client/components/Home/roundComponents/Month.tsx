import React from "react"
import { StyleSheet, Image, Text, View, ImageBackground, Platform } from "react-native"



export default function Month() {
  return (
    <View style={styles.Month}>
      <View style={styles.Month_Object}>
        <View style={styles.Month_Display}>
          <Text style={styles.Month_number}>5</Text>
        </View>
        <Text style={styles.Month_name}>May</Text>
        <View style={styles.Line} />
        <View style={styles.Status}>
          <Image
            style={styles.CheckMark}
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/ccemrtdd67e-70%3A11?alt=media&token=1606f294-437e-4144-bc95-bf452f7abf9f",
            }}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  Month: {
    width: 67.17,
    height: 176,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 14,
    paddingBottom: 16,
    backgroundColor: "rgba(255, 255, 255, 0.01)",
    marginRight: 20,
  },
  Month_Object: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    ...Platform.select({ // Platform-specific shadow properties
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
        android: {
          elevation: 5,
        },
      }),
  },
  Month_Display: {
    width: "100%",
    height: 67.17,
    paddingLeft: 26,
    paddingRight: 26.17,
    paddingTop: 21,
    paddingBottom: 21.17,
    borderRadius: 33.58,
    backgroundColor: "rgba(34,46,80,1)",
    ...Platform.select({ // Platform-specific shadow properties
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
        android: {
          elevation: 5,
        },
      }),
  },
  Month_number: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "rgba(255,255,255,1)",
    fontSize: 25,
    lineHeight: 25,
    fontFamily: "Lato-Bold",
    fontWeight: "700",
    textAlign: "center",
  },
  Month_name: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "rgba(0,0,0,1)",
    fontSize: 20,
    lineHeight: 20,
    fontFamily: "Lato-Regular",
    fontWeight: "400",
    textAlign: "center",
  },
  Line: {
    width: 29,
    height: 2,
    borderWidth: 2,
    borderColor: "rgba(27,154,170,1)",
    transform: [{ rotate: "-90deg" }],
    marginTop: 15,
    marginBottom: 10,
    ...Platform.select({ // Platform-specific shadow properties
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 1,
        },
        android: {
          elevation: 5,
        },
      }),
  },
  Status: {
    width: "40%",
    height: 27.99,
    paddingLeft: 5,
    paddingRight: 5.99,
    paddingTop: 5,
    paddingBottom: 5.99,
    borderWidth: 1,
    borderColor: "rgba(27,154,170,1)",
    borderRadius: 13.99,
    backgroundColor: "rgba(255,255,255,1)",
    ...Platform.select({ // Platform-specific shadow properties
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
        android: {
          elevation: 5,
        },
      }),
  },
  CheckMark: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
})
