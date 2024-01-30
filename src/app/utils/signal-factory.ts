import {signal, WritableSignal} from "@angular/core";
import {InitialSig} from "../shared/types/main.types";
import {BackendErrors} from "../shared/types/auth.types";


export const newSignal = <T>() => {
  return signal<InitialSig<T>>({
    pending: false,
    error: null,
    data: null
  })
}

export const pendSignal = <T extends {}>(signal: WritableSignal<InitialSig<T>>) => {
  signal.set({
    data: null,
    pending: true,
    error: null,
  })
}

export const completeSignal = <T extends {}>(signal: WritableSignal<InitialSig<T>>, data: T) => {
  signal.set({
    data,
    pending: false,
    error: null
  })
}

export const errorSignal = <T extends {}>(signal: WritableSignal<InitialSig<T>>, error: BackendErrors) => {
  signal.set({
    data: null,
    pending: false,
    error
  })
}
