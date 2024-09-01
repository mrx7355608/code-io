import { Textarea } from '@chakra-ui/react';
import React from 'react'

interface IEditorProps {
    value: string;
    setValue: (val: string) => void
}

export default function Editor({ value, setValue }: IEditorProps) {
  return (
      <Textarea resize="none">
        {value}
      </Textarea>
  )
}
