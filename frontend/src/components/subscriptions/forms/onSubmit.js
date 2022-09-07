import {
  postSubscription,
  putSubscription,
} from '../../../services/subscription-http.service';

export const onSubmit = async (values) => {
  try {
    if (values.id) {
      await putSubscription(values.id, values);
    } else {
      await postSubscription(values);
    }
  } catch (_e) {
    throw _e;
  }
};
