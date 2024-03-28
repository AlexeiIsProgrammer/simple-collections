import { ChangeEvent, DragEvent } from 'react';

export type UploadEvent =
  | DragEvent<HTMLDivElement>
  | ChangeEvent<HTMLInputElement>;

export const isDragEvent = (
  event: UploadEvent
): event is DragEvent<HTMLDivElement> => {
  return 'dataTransfer' in event;
};

export const isInputFileEvent = (
  event: UploadEvent
): event is ChangeEvent<HTMLInputElement> => {
  return 'target' in event && event.target instanceof HTMLInputElement;
};
