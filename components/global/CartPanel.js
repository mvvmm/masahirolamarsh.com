import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { useCart } from "../../contexts/Cart";
import Link from "next/link";
import { USDFormatter } from "../../utils/currency";
import { Icon } from "@iconify/react";
import LoadingWheel from "./LoadingWheel";

export default function CartPanel() {
  const cart = useCart();

  return (
    <Transition.Root show={cart.panelOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={cart.setPanelOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Shopping cart
                      </Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="-m-2 p-2 text-slate-700 hover:text-slate-900 focus:outline-none"
                          onClick={() => cart.setPanelOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {cart?.data?.lines?.edges?.map((product) => (
                            <li key={product.node.id} className="py-6 flex">
                              <div className="flex-shrink-0 w-24 h-24 border border-gray-200 overflow-hidden">
                                <img
                                  src={product.node.merchandise.image.url}
                                  alt={product.node.merchandise.image.altText}
                                  className="w-full h-full object-center object-cover"
                                />
                              </div>

                              <div className="ml-4 flex-1 flex flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <Link
                                        href={`/collections/${product.node.merchandise.product.collections.edges[0].node.handle}/products/${product.node.merchandise.product.handle}`}
                                      >
                                        <a>
                                          {
                                            product.node.merchandise.product
                                              .title
                                          }
                                        </a>
                                      </Link>
                                    </h3>
                                    <p className="ml-4">
                                      {USDFormatter.format(
                                        product.node.merchandise.price
                                      )}
                                    </p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">
                                    SIZE HERE?
                                  </p>
                                </div>
                                <div className="flex-1 flex items-end justify-between text-sm">
                                  <p className="text-gray-500">
                                    Qty {product.node.quantity}
                                  </p>

                                  <div className="flex">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        cart.removeItem(product.node.id);
                                      }}
                                    >
                                      <Icon
                                        icon="bytesize:trash"
                                        className="w-6 h-6 cursor-pointer text-red-500 hover:text-red-700"
                                      />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>
                        {USDFormatter.format(
                          cart?.data?.estimatedCost?.subtotalAmount?.amount ||
                            "0.00"
                        )}
                      </p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6 relative">
                      <a
                        href="#"
                        className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-stone-800 hover:bg-stone-900"
                        onClick={() => {
                          cart.setCheckoutLoading(true);
                          cart.checkout();
                        }}
                      >
                        {cart.checkoutLoading && <LoadingWheel />}
                        Checkout
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
