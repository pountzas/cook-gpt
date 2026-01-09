# TestButton

A ui component for [describe purpose].

## Usage

```tsx
import { TestButton } from '@/components/testbutton';

function MyComponent() {
  return (
    <TestButton>
      Content goes here
    </TestButton>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | React.ReactNode | - | The content to display |
| variant | 'primary' \| 'secondary' \| 'outline' \| 'ghost' | 'primary' | The visual variant |
| size | 'sm' \| 'md' \| 'lg' | 'md' | The size variant |
| disabled | boolean | false | Whether the component is disabled |
| loading | boolean | false | Whether to show loading state |

## Examples

### Basic Usage

```tsx
<TestButton>Hello World</TestButton>
```

### With Variants

```tsx
<TestButton variant="secondary">Secondary Button</TestButton>
<TestButton variant="outline">Outline Button</TestButton>
```

### Different Sizes

```tsx
<TestButton size="sm">Small</TestButton>
<TestButton size="lg">Large</TestButton>
```

## Accessibility

This component follows accessibility best practices:
- Proper ARIA attributes
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Testing

The component includes comprehensive unit tests covering:
- Rendering behavior
- User interactions
- Accessibility features
- Edge cases
