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
import { useTranslation } from 'react-i18next';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MarkdownTextareaProps from './types';

const MarkdownTextarea = forwardRef<HTMLTextAreaElement, MarkdownTextareaProps>(
  ({ isEdit, value, onChange, ...props }, ref) => {
    const { t } = useTranslation();
    const [textValue, setTextValue] = useState<string>(
      (value || '').toString()
    );

    return (
      <Tabs>
        <TabList>
          <Tab>{t('markdown.Text')}</Tab>
          <Tab>{t('markdown.Preview')}</Tab>
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
