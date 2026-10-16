import { type VariantProps } from 'class-variance-authority';
import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { buttonVariants } from '@/lib/theme/buttons';

export { buttonVariants };

export interface BaseButtonProps extends VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export type ButtonAsButton = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> & {
    href?: undefined;
  };

export type ButtonAsLink = BaseButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> & {
    href: string;
    external?: boolean;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>((props, ref) => {
  const {
    className,
    variant,
    size,
    fullWidth,
    uppercase,
    isLoading,
    leftIcon,
    rightIcon,
    children,
    ...rest
  } = props;

  const classes = cn(buttonVariants({ variant, size, fullWidth, uppercase }), className);

  const content = (
    <>
      {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin shrink-0" /> : leftIcon}
      {children}
      {!isLoading && rightIcon}
    </>
  );

  if ('href' in props && props.href) {
    const { href, external, target, rel, ...anchorProps } = rest as ButtonAsLink;
    const isExternal =
      external ||
      href.startsWith('http://') ||
      href.startsWith('https://') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:');

    if (isExternal) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target ?? '_blank'}
          rel={rel ?? 'noopener noreferrer'}
          className={classes}
          {...anchorProps}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        {...anchorProps}
      >
        {content}
      </Link>
    );
  }

  const { disabled, type = 'button', ...buttonProps } = rest as ButtonAsButton;

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled || isLoading}
      className={classes}
      {...buttonProps}
    >
      {content}
    </button>
  );
});

Button.displayName = 'Button';
export { Button };
