import { useState } from "react";

function Counter()
{
    const [count, setCount] = useState(0);

    function increment()
    {
        setCount(count + 1);
    }

    function decrement()
    {
        setCount(count - 1);
    }

    function reset()
    {
        setCount(0);
    }

    let status = "";

    if (count > 0)
    {
        status = "Positive";
    }
    else if (count < 0)
    {
        status = "Negative";
    }
    else
    {
        status = "Zero";
    }

    return (
        <div className="container">
            <h1>Counter App</h1>

            <h2>{count}</h2>

            <button className="button" onClick={increment}>
                Increment
            </button>

            <button
                className="button"
                onClick={decrement}
                disabled={count === 0}
            >
                Decrement
            </button>

            <button className="button" onClick={reset}>
                Reset
            </button>

            <p>{status}</p>
        </div>
    );
}

export default Counter;