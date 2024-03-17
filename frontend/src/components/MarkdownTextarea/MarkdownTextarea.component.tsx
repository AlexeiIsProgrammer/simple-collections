import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { forwardRef, useState } from 'react';
import remarkGfm from 'remark-gfm';
import Markdown from 'react-markdown';
import MarkdownTextareaProps from './types';

const MarkdownTextarea = forwardRef<HTMLTextAreaElement, MarkdownTextareaProps>(
  ({ isEdit, value, onChange, ...props }, ref) => {
    const [textValue, setTextValue] = useState<string>(
      (value || '').toString()
    );

    return (
      <Tabs>
        <TabList>
          <Tab>Text</Tab>
          <Tab>Preview</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            {isEdit ? (
              <Textarea
                ref={ref}
                value={value}
                onChange={(e) => {
                  setTextValue(e.target.value);
                  if (onChange) onChange(e);
                }}
                {...props}
              />
            ) : (
              <Text as="p">{textValue}</Text>
            )}
          </TabPanel>
          <TabPanel>
            <Markdown remarkPlugins={[remarkGfm]}>{textValue}</Markdown>
          </TabPanel>
        </TabPanels>
      </Tabs>
    );
  }
);

export default MarkdownTextarea;
