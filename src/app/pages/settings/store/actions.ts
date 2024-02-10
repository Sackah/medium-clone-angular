import {createActionGroup, props} from '@ngrx/store';
import {BackendErrors} from "@shared/types/auth.types";
import {UpdateUserDetails, UpdateUserResponse} from "@shared/types/update-user.types";

export const updateUserActions = createActionGroup({
  source: 'updateUser',
  events: {
    Update: props<UpdateUserDetails>(),
    UpdateSuccess: props<UpdateUserResponse>(),
    UpdateFailure: props<BackendErrors>(),
  }
});
