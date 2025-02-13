import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    width: "100%",
    zIndex: 1200,
    bottom: 0,
    justifyContent: "flex-end",
    borderRadius: 25,
    paddingHorizontal: 15,
    borderWidth: 1,
  },

  langModalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  line: {
    width: 75,
    height: 4,
    borderRadius: 20,
    alignSelf: "center",
    marginVertical: 10,
  },
  flexContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    maxHeight: "80%",
  },

  modalHeader: {
    marginBottom: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  filterSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    paddingVertical: 10,
  },
  filterOption: {
    paddingVertical: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonContainer: {
    marginTop: "auto",
    paddingTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  resetButton: {
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  showResultsButton: {
    marginLeft: 10,
  },
  showResultsText: {
    color: "#fff",
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  selectedOption: {
    backgroundColor: "#f0f0f0",
  },
});
