import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import addresses from "../contract/addresses.json";
import factoryAbi from "../contract/factoryAbi.json";
import poolAbi from "../contract/poolAbi.json";
import erc20Abi from "../contract/erc20Abi.json";
import { ethers } from "ethers";

export default function SplitterAddressCard({ provider }) {
  const [pools, setPools] = useState([]);
  const [response, setResponse] = useState([]);

  useEffect(() => {
    getPools();
  }, []);

  async function getPools() {
    const { chainId } = await provider.getNetwork();
    const factoryAddress = addresses[chainId.toString()].factory;
    // connect to contracts
    const factory = new ethers.Contract(factoryAddress, factoryAbi, provider);
    // get pool addresses from events
    const filter = factory.filters.PoolCreated();
    const events = await factory.queryFilter(filter);
    // populate pool
    let p = [];
    for (let event of events) {
      const poolAddress = event.args[4];
      const token0Address = event.args[0];
      const token1Address = event.args[1];
      // protocol fees
      const pool = new ethers.Contract(poolAddress, poolAbi, provider);
      const protocolFees = await pool.protocolFees();
      // get token0
      const token0 = new ethers.Contract(token0Address, erc20Abi, provider);
      const token0Name = await token0.name();
      // get token1
      const token1 = new ethers.Contract(token1Address, erc20Abi, provider);
      const token1Name = await token1.name();
      p.push({
        address: poolAddress,
        token0: {
          address: token0Address,
          name: token0Name,
          protocolFee: protocolFees.token0.toString(),
        },
        token1: {
          address: token1Address,
          name: token1Name,
          protocolFee: protocolFees.token1.toString(),
        },
      });
    }
    console.log(p);
    setPools(p);
  }

  async function collectProtocol(
    poolAddress,
    amount0Requested,
    amount1Requested,
    index
  ) {
    try {
      // connect to pool
      const pool = new ethers.Contract(
        poolAddress,
        poolAbi,
        provider.getSigner()
      );
      // MM popup to send transaction
      const { hash } = await pool.collectProtocol(
        poolAddress,
        amount0Requested,
        amount1Requested
      );
      // display hash
      const newResponse = [...response];
      newResponse[index] = hash;
      setResponse(newResponse);
    } catch (error) {
      console.error(error);
      // display error
      const newResponse = [...response];
      newResponse[index] = error.message;
      setResponse(newResponse);
    }
  }

  return (
    <>
      {pools.map((pool, index) => (
        <div className={styles.card} key={index}>
          <h2>Pool</h2>
          <p>{pool.address}</p>
          <hr />
          <p>{pool.token0.name}</p>
          <p>{pool.token0.address}</p>
          <p>Amount: {pool.token0.protocolFee}</p>
          <hr />
          <p>{pool.token1.name}</p>
          <p>{pool.token1.address}</p>
          <p>Amount: {pool.token1.protocolFee}</p>
          <hr />
          <h3
            className={styles.smallButton}
            onClick={() =>
              collectProtocol(
                pool.address,
                pool.token0.protocolFee,
                pool.token1.protocolFee,
                index
              )
            }
          >
            Collect
          </h3>
          <code>{response[index]}</code>
        </div>
      ))}
    </>
  );
}
