import { ContentState, EditorState, convertFromHTML, convertFromRaw, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

export const getPlainText = (values) => {
  const contentState = values.getCurrentContent();
  const rawContentState = convertToRaw(contentState);
  const plainText = rawContentState.blocks.map((block) => block.text).join('\n');
  return plainText;
};

export const setContent = (values) => {
  const contentState = values.getCurrentContent();
  const rawContentState = convertToRaw(contentState);
  const jsonString = JSON.stringify(rawContentState);
  return jsonString;
};

export const getContent = (response) => {
  return EditorState.createWithContent(convertFromRaw(JSON.parse(response)));
};

export const getPlainTextWithHtmlStyles = (values) => {
  const contentState = values.getCurrentContent();
  const rawContentState = convertToRaw(contentState);

  // Extract text and HTML styles
  const textWithStyles = rawContentState.blocks.map((block) => {
    const inlineStyles = block.inlineStyleRanges.reduce((styles, range) => {
      const style = contentState.getBlockForKey(block.key).getInlineStyleAt(range.offset);
      return styles.add(style);
    }, new Set());

    const stylesArray = Array.from(inlineStyles);

    return {
      text: block.text,
      styles: stylesArray
    };
  });

  // Convert to plain text with HTML styles
  const plainTextWithHtmlStyles = textWithStyles
    .map(({ text, styles }) => {
      const htmlStyles = styles.map((style) => `<span style="${style}">`).join('');
      return `${htmlStyles}${text}</span>`;
    })
    .join('\n');

  return plainTextWithHtmlStyles;
};

export const setContentValue = (values) => {
  const currentContent = values.getCurrentContent();
  return draftToHtml(convertToRaw(currentContent));
};

export const getContentValue = (response) => {
  const htmlContent = response || '';
  const blocksFromHTML = convertFromHTML(htmlContent);
  const contentState = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks);
  return EditorState.createWithContent(contentState);
};
