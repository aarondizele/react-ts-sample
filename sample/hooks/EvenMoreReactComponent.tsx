export interface HeadingProps {
  title: string;
}

export function Heading({ title }: HeadingProps) {
  return <h2>{title}</h2>
}

export type ListComponent = <ListItem>({
  items,
  render
}: {
  items: ListItem[];
  render: (item: ListItem) => JSX.Element;
}) => JSX.Element;

export const List: ListComponent = ({items, render}) => {
  return (
    <ul>
      {items.map((item, index) => (<li key={index}>{render(item)}</li>))}
    </ul>
  )
}

function TestComponent() {
  return (
    <div>
      <Heading title="Hello World!!!" />
      <List items={["a", "b", "c"]} render={(str) => <strong>{str}</strong>} />
    </div>
  )
}

export default TestComponent;