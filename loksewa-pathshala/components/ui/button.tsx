import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-[linear-gradient(135deg,var(--color-primary),var(--color-accent))] text-white shadow-glow hover:-translate-y-0.5',
        secondary: 'bg-white/8 text-text border border-white/10 hover:bg-white/12',
        ghost: 'bg-transparent text-text hover:bg-white/8',
        outline: 'border border-border bg-transparent text-text hover:bg-white/6',
      },
      size: {
        default: 'h-11 px-5',
        sm: 'h-9 px-4',
        lg: 'h-12 px-6 text-base',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  href?: string;
}

export function Button({ className, variant, size, href, children, ...props }: ButtonProps): JSX.Element {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (href) {
    return (
      <Link className={classes} href={href} {...(props as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type={props.type ?? 'button'} {...props}>
      {children}
    </button>
  );
}