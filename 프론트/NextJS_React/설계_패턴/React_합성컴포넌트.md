# 합성 컴포넌트 (Compound Component Pattern)

계속 늘어나는 요구 조건에 따른 컴포넌트

```javascript
interface Props {
    isOpen: boolean;
    title: string;
    buttonLabel: string;
    onClickButton: (e: MouseEvent) => void;
    isChecked?: boolean;
    checkBoxLabel?: string;
    onClickCheckBox? : (e: MouseEvent) => void;
    descriptionList?: string[]
}

function Dialog({
        isOpen,
        title,
        buttonLabel,
        onClickButton,
        isChecked,
        checkBoxLabel,
        onClickCheckBox,
        descriptionList
    }: Props){
     if (!isOpen){
        return null;
    }
    return React.createPortal(
        <div>
            <span>{title}</span>
            {descriptionList && descriptionList.map(desc => <span key={desc}>{desc}</span>)}
            {checkBoxLabel && <div>
                <input checked={isChecked} onClick={onClickCheckBox} type="checkbox" id="dialog_checkbox">
                <label for="dialog_checkbox">{checkBoxLabel}</label>
            </div>}
            <button onClick={onClickButton}>{buttonLabel}</button>
        </div>
    ,document.body)
}
```

합성 컴포넌트는 HTML 표준의 select 와 option 태그 조합과 같은 것

```html
<select>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</select>
```

```javascript
/**
 * 서브 컴포넌트
 */
interface DialogTitleProps {
    children?: ReactNode;
}
function DialogTitle({children}: DialogTitleProps){
    return <div css={/*DialogTitle 스타일*/}>{children}</div>
}

interface DialogLabelButtonProps {
    children?: ReactNode;
    onClick?: (e: MouseEvent) => void;
}
function DialogLabelButton({children}: DialogLabelButtonProps){
    return <div css={/*DialogLabelButton 스타일*/}>{children}</div>
}

// ... 기타 Dialog 서브 컴포넌트

/**
 * 메인 컴포넌트
 */
const DialogLabelButtonType = (<DialogLabelButton />).type;
function getDialogLabelButtons(children: ReactNode) {
  const childrenArray = Children.toArray(children);
  return childrenArray
    .filter(
      child => isValidElement(child) && child.type === DialogLabelButtonType,
    )
    .slice(0, 2);
}

interface DialogMainProps {
    children?: ReactNode;
    isOpen: boolean;
}

function DialogMain({children, isOpen}: DialogMainProps){
    if(!isOpen) {
        return null;
    }
    const dialogContents = getDialogContents(children);
    const dialogLabelButtons = getDialogLabelButtons(children);
    const dialogDimmed = getDialogDimmed(children);

    return createPortal(
        <div>
            <div>{getDialogDimmed(children)}</div>
            {dialogContents && (
                <div>{dialogContents}</div>
            )}
            {dialogLabelButtons && (
                <div>{dialogLabelButtons}</div>
            )}
        </div>,
    document.body)
}

/**
 * 메인 & 서브 컴포넌트를 묶어서 export
 */
export const Dialog = Object.assign(DialogMain, {
  Dimmed: DialogDimmed,
  Title: DialogTitle,
  Subtitle: DialogSubtitle,
  Description: DialogDescription,
  Comment: DialogComment,
  CheckButton: DialogCheckButton,
  CheckBox: DialogCheckBox,
  TextButton: DialogTextButton,
  Button: DialogButton,
  LabelButton: DialogLabelButton,
  Divider: DialogDivider,
});
```

사용 예

```javascript
// 합성 컴포넌트 방식. 훨씬 직관적이고 상황별로 유연하게 대처할 수 있습니다.
<Dialog>
  <Dialog.Dimmed />
  <Dialog.Title>타이틀</Dialog.Title>
  <Dialog.CheckBox isChecked hasArrowButton>
    버튼명
  </Dialog.CheckBox>
  <Dialog.CheckBox hasArrowButton>버튼명</Dialog.CheckBox>
  <Dialog.CheckBox hasArrowButton>버튼명</Dialog.CheckBox>
  {/* 혹시 여기에 무언가 설명이 들어가야 한다면 아래처럼 추가만 하면 됩니다. 더이상 이미 구현된 Dialog를 수정할 필요는 없습니다.
    <Dialog.Description>설명</Dialog.Description> 
  */}
  <Dialog.CheckBox hasArrowButton>버튼명</Dialog.CheckBox>
  <Dialog.CheckBox hasArrowButton>버튼명</Dialog.CheckBox>
  <Dialog.LabelButton>버튼레이블</Dialog.LabelButton>
</Dialog>
```
