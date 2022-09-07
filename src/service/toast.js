import { NotificationManager } from "react-notifications";

export const Toast = ({ type = "success", message, time = "2000" }) => {
  NotificationManager.listNotify.forEach((n) => {
    NotificationManager.remove({ id: n.id });
  });
  if (Array.isArray(message)) {
    let item;

    for (item of message) {
      NotificationManager[type](item.message, "", time);
    }
  } else {
    NotificationManager[type](message, "", time);
  }
};
